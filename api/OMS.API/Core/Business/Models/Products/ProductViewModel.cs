using OMS.Api.Core.Entities;
using OMS.API.Core.Business.Models.Categories;
using System;
using System.Collections.Generic;
using System.Linq;

namespace OMS.API.Core.Business.Models.Products
{
    public class ProductViewModel
    {
        public ProductViewModel() { }

        public ProductViewModel(Product product)
        {
            if (product != null)
            {
                Id = product.Id;
                Name = product.Name;
                Image = product.Image;
                Category = product.Category != null ? new CategoryViewModel(product.Category) : null;
                Sizes = product.ProductSizes.Select(x => new ProductSizeViewModel(x)).ToList();
            }
        }

        public Guid Id { get; }

        public string Name { get; set; }

        public string Image { get; set; }

        public CategoryViewModel Category { get; set; }

        public List<ProductSizeViewModel> Sizes { get; set; }
    }
}
