using OMS.Api.Core.Entities;

namespace OMS.API.Core.Business.Models.Categories
{
    public class CategoryManageModel
    {
        public CategoryManageModel() { }

        public CategoryManageModel(Category category)
        {
            if (category != null)
            {
                Name = category.Name;
                Description = category.Description;
            }
        }

        public void SetCategoryModel(Category category)
        {
            category.Name = Name;
            category.Description = Description;
        }

        public string Name { get; set; }

        public string Description { get; set; }
    }
}
