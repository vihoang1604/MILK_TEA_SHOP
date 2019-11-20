using System;
namespace OMS.API.Core.Business.Models.Orders
{
    public class OrderDetailManageModel
    {
        public OrderDetailManageModel() { }

        public Guid OrderId { get; set; }

        public Guid ProductSizeId { get; set; }

        public int Quantity { get; set; }

        public decimal Price { get; set; }
    }
}
