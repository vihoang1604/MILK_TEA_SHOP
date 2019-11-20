using OMS.Api.Core.Entities;
using OMS.API.Core.Entities.Enums;
using System;

namespace OMS.API.Core.Business.Models.Orders
{
    public class OrderManageModel
    {
        public OrderEnums.Status Status { get; set; }

        public string Message { get; set; }

        public void SetOrderModel(Order order)
        {
            if (Enum.IsDefined(typeof(OrderEnums.Status), Status))
            {
                order.Status = Status;
                order.Message = Message;
            }
        }
    }
}
