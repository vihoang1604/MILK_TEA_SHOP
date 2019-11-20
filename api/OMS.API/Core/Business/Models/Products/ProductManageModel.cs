using OMS.Api.Core.Business.IoC;
using OMS.Api.Core.DataAccess.Repositories;
using OMS.Api.Core.Entities;
using OMS.API.Core.Common.Constants;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace OMS.API.Core.Business.Models.Products
{
    public class ProductManageModel : IValidatableObject
    {
        public ProductManageModel() { }

        public ProductManageModel(Product product)
        {
            if (product != null)
            {
                Name = product.Name;
                Image = product.Image;
                CategoryId = product.CategoryId;
            }
        }

        public void SetProductModel(Product product)
        {
            product.Name = Name;
            product.Image = Image;
            product.CategoryId = CategoryId;
        }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Image { get; set; }

        [Required]
        public Guid CategoryId { get; set; }

        [Required]
        public List<ProductSizeManageModel> ProductSizes { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            var categoryRepository = IoCHelper.GetInstance<IRepository<Category>>();

            if (CategoryId == null)
            {
                yield return new ValidationResult(ProductMessagesConstants.CATEGORY_NOT_FOUND, new string[] { "CategoryId" });
            }

            var category = categoryRepository.GetAll().FirstOrDefault(x => x.Id == CategoryId);
            if (category == null)
            {
                yield return new ValidationResult(ProductMessagesConstants.CATEGORY_NOT_FOUND, new string[] { "CategoryId" });
            }
        }
    }
}
