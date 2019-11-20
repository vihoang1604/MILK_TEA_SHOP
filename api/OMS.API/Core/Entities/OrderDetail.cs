using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OMS.Api.Core.Entities
{
    [Table("OrderDetail")]
    public class OrderDetail : BaseEntity
    {
        public OrderDetail() : base() { }

        [Required]
        public int Quantity { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal? TotalPrice
        {
            get
            {
                if (ProductSize != null)
                {
                    return ProductSize.Price * Quantity;
                }
                return null;
            }
        }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }

        [Required]
        public Guid OrderId { get; set; }

        public Order Order { get; set; }

        [Required]
        public Guid ProductSizeId { get; set; }
        public ProductSize ProductSize { get; set; }
    }
}
