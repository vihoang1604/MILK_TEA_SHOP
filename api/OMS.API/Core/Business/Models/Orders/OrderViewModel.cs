using OMS.Api.Core.Entities;
using OMS.API.Core.Entities.Enums;
using System;
using System.Collections.Generic;
using System.Linq;

namespace OMS.API.Core.Business.Models.Orders
{
    public class OrderViewModel
    {
        public OrderViewModel() { }

        public OrderViewModel(Order order) : this()
        {
            if (order != null)
            {
                Id = order.Id;
                Customer = new CustomerViewModel(order.User);
                OrderDetails = order.OrderDetails.Select(x => new OrderDetailViewModel(x)).ToList();
                DeliveryAddress = order.DeliveryAddress;
                Note = order.Note;
                Message = order.Message;
                OrderDate = order.CreatedOn;
                ReceivedDate = order.ReceivedDate;
                CanceledDate = order.CanceledDate;
                Status = order.Status;
            }
        }

        public Guid Id { get; set; }

        public CustomerViewModel Customer { get; set; }

        public List<OrderDetailViewModel> OrderDetails { get; set; }

        public int? TotalQuantity
        {
            get
            {
                if (!OrderDetails.Equals(null))
                {
                    var result = 0;
                    foreach (var product in OrderDetails)
                    {
                        result += product.Quantity;
                    }
                    return result;
                }
                return null;
            }
        }

        public decimal? TotalPrice
        {
            get
            {
                if (!OrderDetails.Equals(null))
                {
                    decimal result = 0;
                    foreach (var product in OrderDetails)
                    {
                        result += (decimal)product.TotalPrice;
                    }
                    return result;
                }
                return null;
            }
        }

        public string DeliveryAddress { get; set; }

        public string Note { get; set; }

        public string Message { get; set; }

        public DateTime? OrderDate { get; set; }

        public DateTime? ReceivedDate { get; set; }

        public DateTime? CanceledDate { get; set; }

        public OrderEnums.Status Status { get; set; }
    }
}
