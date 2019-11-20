using OMS.Api.Core.Entities;
using System;

namespace OMS.API.Core.Business.Models.Orders
{
    public class OrderDetailViewModel
    {
        public OrderDetailViewModel() { }

        public OrderDetailViewModel(OrderDetail orderDetail) : this()
        {
            if (orderDetail != null)
            {
                Id = orderDetail.Id;
                ProductName = orderDetail.ProductSize.Product.Name;
                ProductImage = orderDetail.ProductSize.Product.Image;
                SizeName = orderDetail.ProductSize.Size.Name;
                Quantity = orderDetail.Quantity;
                Price = orderDetail.Price;
            }
        }

        public Guid Id { get; set; }

        public string ProductName { get; set; }

        public string ProductImage { get; set; }

        public string SizeName { get; set; }

        public decimal Price { get; set; }

        public int Quantity { get; set; }

        public decimal? TotalPrice
        {
            get
            {
                if (!Quantity.Equals(null))
                {
                    return Price * Quantity;
                }
                return null;
            }
        }
    }
}
