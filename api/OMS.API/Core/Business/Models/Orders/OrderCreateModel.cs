using OMS.Api.Core.Entities;
using System;
using System.Collections.Generic;

namespace OMS.API.Core.Business.Models.Orders
{
    public class OrderCreateModel
    {
        public OrderCreateModel() { }

        public OrderCreateModel(Order order)
        {
            if (order != null)
            {
                UserId = order.UserId;
                Note = order.Note;
            }
        }

        public Guid UserId { get; set; }

        public string DeliveryAddress { get; set; }

        public string Note { get; set; }

        public List<OrderDetailManageModel> OrderDetails { get; set; }
    }
}
