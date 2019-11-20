using OMS.Api.Core.Entities;
using System;

namespace OMS.API.Core.Business.Models.Categories
{
    public class CategoryViewModel
    {
        public CategoryViewModel() { }

        public CategoryViewModel(Category category) : this()
        {
            if (category != null)
            {
                Id = category.Id;
                Name = category.Name;
                Description = category.Description;
            }
        }

        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }
    }
}
