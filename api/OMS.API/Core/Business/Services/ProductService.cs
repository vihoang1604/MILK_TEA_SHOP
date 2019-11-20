using Microsoft.EntityFrameworkCore;
using OMS.Api.Core.Business.Models.Base;
using OMS.Api.Core.Common.Constants;
using OMS.Api.Core.Common.Reflections;
using OMS.Api.Core.DataAccess.Repositories;
using OMS.Api.Core.Entities;
using OMS.API.Core.Business.Models.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OMS.API.Core.Business.Services
{
    public interface IProductService
    {
        Task<PagedList<ProductViewModel>> ListProductAsync(ProductRequestListViewModel productRequestListViewModel);

        Task<ProductViewModel> GetProductByIdAsync(Guid id);

        Task<ResponseModel> CreateProductAsync(ProductManageModel productManageModel);

        Task<ResponseModel> UpdateProductAsync(Guid id, ProductManageModel productManageModel);

        Task<ResponseModel> DeleteProductAsync(Guid id);
    }

    public class ProductService : IProductService
    {
        private readonly IRepository<Product> _productRepository;
        private readonly IRepository<ProductSize> _productSizeRepository;

        public ProductService(IRepository<Product> productRepository, IRepository<ProductSize> productSizeRepository)
        {
            _productRepository = productRepository;
            _productSizeRepository = productSizeRepository;
        }

        public async Task<PagedList<ProductViewModel>> ListProductAsync(ProductRequestListViewModel productRequestListViewModel)
        {
            var list = await GetAll().Where(x => (string.IsNullOrEmpty(productRequestListViewModel.Query)
                    || (x.Name.Contains(productRequestListViewModel.Query))))
                        .Select(x => new ProductViewModel(x)).ToListAsync();

            var productViewModelProperties = GetAllPropertyNameOfCategoryViewModel();
            var requestPropertyName = !string.IsNullOrEmpty(productRequestListViewModel.SortName) ? productRequestListViewModel.SortName.ToLower() : string.Empty;
            string matchedPropertyName = string.Empty;

            foreach (var productViewModelProperty in productViewModelProperties)
            {
                var lowerProductViewModelProperty = productViewModelProperty.ToLower();
                if (lowerProductViewModelProperty.Equals(requestPropertyName))
                {
                    matchedPropertyName = productViewModelProperty;
                }
            }

            if (string.IsNullOrEmpty(matchedPropertyName))
            {
                matchedPropertyName = "Name";
            }

            var type = typeof(ProductViewModel);
            var sortProperty = type.GetProperty(matchedPropertyName);

            list = productRequestListViewModel.IsDesc ? list.OrderByDescending(x => sortProperty.GetValue(x, null)).ToList() : list.OrderBy(x => sortProperty.GetValue(x, null)).ToList();

            return new PagedList<ProductViewModel>(list, productRequestListViewModel.Offset ?? CommonConstants.Config.DEFAULT_SKIP, productRequestListViewModel.Limit ?? CommonConstants.Config.DEFAULT_TAKE);
        }

        public async Task<ProductViewModel> GetProductByIdAsync(Guid id)
        {
            var product = await GetAll().FirstOrDefaultAsync(x => x.Id == id);
            if (product != null)
            {
                return new ProductViewModel(product);
            }
            return null;
        }

        public async Task<ResponseModel> CreateProductAsync(ProductManageModel productManageModel)
        {
            var product = await _productRepository.FetchFirstAsync(x => x.Name == productManageModel.Name && x.CategoryId == productManageModel.CategoryId);
            if (product != null)
            {
                return new ResponseModel()
                {
                    StatusCode = System.Net.HttpStatusCode.BadRequest,
                    Message = "This product has already existed. You can try again with the update!",
                };
            }
            else
            {
                product = AutoMapper.Mapper.Map<Product>(productManageModel);

                await _productRepository.InsertAsync(product);

                return new ResponseModel()
                {
                    StatusCode = System.Net.HttpStatusCode.OK,
                    Data = new ProductViewModel(product)
                };
            }
        }

        public async Task<ResponseModel> UpdateProductAsync(Guid id, ProductManageModel productManageModel)
        {
            var product = await GetAll().FirstOrDefaultAsync(x => x.Id == id);
            if (product != null)
            {
                var existedProductName = await _productRepository.FetchFirstAsync(x => x.Name == productManageModel.Name && x.Id != id);
                if (existedProductName != null)
                {
                    return new ResponseModel()
                    {
                        StatusCode = System.Net.HttpStatusCode.BadRequest,
                        Message = "Product " + productManageModel.Name + " has already existed. Please try another name!"
                    };
                }
                else
                {
                    product.CategoryId = productManageModel.CategoryId;

                    productManageModel.SetProductModel(product);

                    if (product.ProductSizes != null && product.ProductSizes.Any())
                    {
                        foreach (var productSizeManageModel in productManageModel.ProductSizes)
                        {
                            var productSize = await _productSizeRepository.GetAll().FirstOrDefaultAsync(x => (x.ProductId == id && x.SizeId == productSizeManageModel.SizeId));
                            if (productSize != null)
                            {
                                productSize.Price = productSizeManageModel.Price;
                                await _productSizeRepository.UpdateAsync(productSize);
                            }
                            else
                            {
                                productSize = new ProductSize()
                                {
                                    ProductId = id,
                                    SizeId = productSizeManageModel.SizeId,
                                    Price = productSizeManageModel.Price
                                };
                                await _productSizeRepository.InsertAsync(productSize);
                            }
                        }
                    }
                    else
                    {
                        product.ProductSizes = new List<ProductSize>();
                        foreach (var productSize in productManageModel.ProductSizes)
                        {
                            product.ProductSizes.Add(new ProductSize()
                            {
                                ProductId = product.Id,
                                SizeId = productSize.SizeId,
                                Price = productSize.Price
                            });
                        }
                    }

                    await _productRepository.UpdateAsync(product);

                    return new ResponseModel()
                    {
                        StatusCode = System.Net.HttpStatusCode.OK,
                        Data = new ProductViewModel(product)
                    };
                }
            }
            else
            {
                return new ResponseModel()
                {
                    StatusCode = System.Net.HttpStatusCode.BadRequest,
                    Message = "This product has not existed. Please try again!",
                };
            }
        }

        public async Task<ResponseModel> DeleteProductAsync(Guid id)
        {
            var product = await GetAll().FirstOrDefaultAsync(x => x.Id == id);
            if (product != null)
            {
                await _productRepository.DeleteAsync(id);
                return new ResponseModel()
                {
                    StatusCode = System.Net.HttpStatusCode.OK,
                    Data = new ProductViewModel(product)
                };
            }
            return new ResponseModel()
            {
                StatusCode = System.Net.HttpStatusCode.OK
            };
        }

        private List<string> GetAllPropertyNameOfCategoryViewModel()
        {
            var productViewModel = new ProductViewModel();
            var type = productViewModel.GetType();

            return ReflectionUtilities.GetAllPropertyNamesOfType(type);
        }

        private IQueryable<Product> GetAll()
        {
            return _productRepository.GetAll()
                .Include(x => x.Category)
                    .Where(x => !x.Category.RecordDeleted)
                .Include(x => x.ProductSizes)
                .Where(x => x.RecordActive);
        }
    }
}
