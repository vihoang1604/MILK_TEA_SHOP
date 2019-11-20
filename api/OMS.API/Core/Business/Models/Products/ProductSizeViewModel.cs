using OMS.Api.Core.Entities;
using OMS.API.Core.Common.Constants;
using System;

namespace OMS.API.Core.Business.Models.Products
{
    public class ProductSizeViewModel
    {
        public ProductSizeViewModel() { }

        public ProductSizeViewModel(ProductSize productSize)
        {
            ProductSizeId = productSize.Id;
            SizeName = (productSize.SizeId == SizeConstants.Medium.Id) ? SizeConstants.Medium.Name : SizeConstants.Large.Name;
            Price = productSize.Price;
        }

        public Guid ProductSizeId { get; set; }

        public string SizeName { get; set; }

        public decimal Price { get; set; }
    }
}
