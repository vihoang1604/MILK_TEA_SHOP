using System;

namespace OMS.API.Core.Business.Models.Products
{
    public class ProductSizeManageModel
    {
        public ProductSizeManageModel() { }

        public Guid Id { get; set; }

        public Guid SizeId { get; set; }

        public Guid ProductId { get; set; }

        public decimal Price { get; set; }
    }
}
