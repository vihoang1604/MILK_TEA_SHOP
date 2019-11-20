using Microsoft.EntityFrameworkCore;
using OMS.Api.Core.Business.Models.Base;
using OMS.Api.Core.Common.Constants;
using OMS.Api.Core.Common.Reflections;
using OMS.Api.Core.DataAccess.Repositories;
using OMS.Api.Core.Entities;
using OMS.API.Core.Business.Models.Categories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OMS.API.Core.Business.Services
{
    public interface ICategoryService
    {
        Task<PagedList<CategoryViewModel>> ListCategoryAsync(CategoryRequestListViewModel categoryRequestListViewModel);

        Task<CategoryViewModel> GetCategoryByIdAsync(Guid id);

        Task<ResponseModel> CreateCategoryAsync(CategoryManageModel categoryManageModel);

        Task<ResponseModel> UpdateCategoryAsync(Guid id, CategoryManageModel categoryManageModel);

        Task<ResponseModel> DeleteCategoryAsync(Guid id);
    }

    public class CategoryService : ICategoryService
    {
        private readonly IRepository<Category> _categoryRepository;

        public CategoryService(IRepository<Category> categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        public async Task<PagedList<CategoryViewModel>> ListCategoryAsync(CategoryRequestListViewModel categoryRequestListViewModel)
        {
            var list = await GetAll()
                .Where(x => (string.IsNullOrEmpty(categoryRequestListViewModel.Query)
                    || (x.Name.Contains(categoryRequestListViewModel.Query))))
                        .Select(x => new CategoryViewModel(x)).ToListAsync();

            var categoryViewModelProperties = GetAllPropertyNameOfCategoryViewModel();
            var requestPropertyName = !string.IsNullOrEmpty(categoryRequestListViewModel.SortName) ? categoryRequestListViewModel.SortName.ToLower() : string.Empty;
            string matchedPropertyName = string.Empty;

            foreach (var categoryViewModelProperty in categoryViewModelProperties)
            {
                var lowerTypeViewModelProperty = categoryViewModelProperty.ToLower();
                if (lowerTypeViewModelProperty.Equals(requestPropertyName))
                {
                    matchedPropertyName = categoryViewModelProperty;
                    break;
                }
            }

            if (string.IsNullOrEmpty(matchedPropertyName))
            {
                matchedPropertyName = "Name";
            }

            var type = typeof(CategoryViewModel);
            var sortProperty = type.GetProperty(matchedPropertyName);

            list = categoryRequestListViewModel.IsDesc ? list.OrderByDescending(x => sortProperty.GetValue(x, null)).ToList() : list.OrderBy(x => sortProperty.GetValue(x, null)).ToList();

            return new PagedList<CategoryViewModel>(list, categoryRequestListViewModel.Offset ?? CommonConstants.Config.DEFAULT_SKIP, categoryRequestListViewModel.Limit ?? CommonConstants.Config.DEFAULT_TAKE);
        }

        public async Task<CategoryViewModel> GetCategoryByIdAsync(Guid id)
        {
            var category = await GetAll().FirstOrDefaultAsync(x => x.Id == id);
            if (category != null)
            {
                return new CategoryViewModel(category);
            }
            return null;
        }

        public async Task<ResponseModel> CreateCategoryAsync(CategoryManageModel categoryManageModel)
        {
            var category = await _categoryRepository.FetchFirstAsync(x => x.Name == categoryManageModel.Name);
            if (category != null)
            {
                return new ResponseModel()
                {
                    StatusCode = System.Net.HttpStatusCode.BadRequest,
                    Message = "This category has already existed. You can try again with the update!",
                };
            }
            else
            {
                category = AutoMapper.Mapper.Map<Category>(categoryManageModel);
                await _categoryRepository.InsertAsync(category);
                return new ResponseModel()
                {
                    StatusCode = System.Net.HttpStatusCode.OK,
                    Data = new CategoryViewModel(category),
                };
            }
        }

        public async Task<ResponseModel> UpdateCategoryAsync(Guid id, CategoryManageModel categoryManageModel)
        {
            var category = await _categoryRepository.GetByIdAsync(id);
            if (category == null)
            {
                return new ResponseModel()
                {
                    StatusCode = System.Net.HttpStatusCode.NotFound,
                    Message = "This category does not exist. Please try again!"
                };
            }
            else
            {
                var existedCategoryName = await _categoryRepository.FetchFirstAsync(x => x.Name == categoryManageModel.Name && x.Id != id);
                if (existedCategoryName != null)
                {
                    return new ResponseModel()
                    {
                        StatusCode = System.Net.HttpStatusCode.BadRequest,
                        Message = "Category " + categoryManageModel.Name + " has already existed on system. Please try again!",
                    };
                }
                else
                {
                    categoryManageModel.SetCategoryModel(category);
                    await _categoryRepository.UpdateAsync(category);
                    return new ResponseModel()
                    {
                        StatusCode = System.Net.HttpStatusCode.OK,
                        Data = new CategoryViewModel(category)
                    };
                }
            }
        }

        public async Task<ResponseModel> DeleteCategoryAsync(Guid id)
        {
            var category = await _categoryRepository.GetByIdAsync(id);
            if (category != null)
            {
                await _categoryRepository.DeleteAsync(category);
                return new ResponseModel()
                {
                    StatusCode = System.Net.HttpStatusCode.OK,
                    Data = new CategoryViewModel(category)
                };

            }
            return new ResponseModel()
            {
                StatusCode = System.Net.HttpStatusCode.OK
            };
        }

        private IQueryable<Category> GetAll()
        {
            return _categoryRepository.GetAll().Where(x => !x.RecordDeleted);
        }

        private List<string> GetAllPropertyNameOfCategoryViewModel()
        {
            var categoryViewModel = new CategoryViewModel();
            var type = categoryViewModel.GetType();

            return ReflectionUtilities.GetAllPropertyNamesOfType(type);
        }
    }
}
