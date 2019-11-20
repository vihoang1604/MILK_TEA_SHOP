using OMS.API.Core.Entities.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OMS.Api.Core.Entities
{
    [Table("Order")]
    public class Order : BaseEntity
    {
        public Order() : base()
        {
            Status = OrderEnums.Status.WaitingForConfirmation;
        }

        [Required]
        public Guid UserId { get; set; }

        public User User { get; set; }

        public string DeliveryAddress { get; set; }

        public string Note { get; set; }

        public DateTime? CanceledDate { get; set; }

        public DateTime? ReceivedDate { get; set; }

        public DateTime? RefusedDate { get; set; }

        public string Message { get; set; }

        [Required]
        public OrderEnums.Status Status { get; set; }

        [Required]
        public int TotalQuantity { get; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalPrice { get; }

        public ICollection<OrderDetail> OrderDetails { get; set; }
    }
}
