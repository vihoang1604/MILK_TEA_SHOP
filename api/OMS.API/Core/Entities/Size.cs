using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OMS.Api.Core.Entities
{
    [Table("Size")]
    public class Size : BaseEntity
    {
        public Size() : base() { }

        public Size(Guid id, string name)
        {
            if (id != null)
            {
                Id = id;
            }
            if (!string.IsNullOrEmpty(name))
            {
                Name = name;
            }
        }

        public Size(string name)
        {
            if (!string.IsNullOrEmpty(name))
            {
                Name = name;
            }
        }

        [StringLength(255)]
        [Required]
        public string Name { get; set; }

        public List<ProductSize> ProductSizes { get; set; }
    }
}