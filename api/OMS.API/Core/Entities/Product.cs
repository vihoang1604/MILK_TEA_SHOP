using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OMS.Api.Core.Entities
{
    [Table("Product")]
    public class Product : BaseEntity
    {
        [StringLength(255)]
        [Required]
        public string Name { get; set; }

        [StringLength(512)]
        [Required]
        public string Image { get; set; }

        [Required]
        public Guid CategoryId { get; set; }

        public Category Category { get; set; }

        public List<ProductSize> ProductSizes { get; set; }
    }
}