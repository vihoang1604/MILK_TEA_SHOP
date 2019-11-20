using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OMS.Api.Core.Entities
{
    [Table("ProductSize")]
    public class ProductSize : BaseEntity
    {
        [Required]
        public Guid ProductId { get; set; }
        public Product Product { get; set; }

        [Required]
        public Guid SizeId { get; set; }
        public Size Size { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }
    }
}