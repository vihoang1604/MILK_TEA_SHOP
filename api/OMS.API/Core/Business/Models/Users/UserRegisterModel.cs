using OMS.Api.Core.Business.IoC;
using OMS.Api.Core.DataAccess.Repositories;
using OMS.Api.Core.Entities;
using OMS.Api.Core.Entities.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace OMS.Api.Core.Business.Models.Users
{
    public class UserRegisterModel : IValidatableObject
    {
        [Required]
        public string Name { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string PhoneNumber { get; set; }

        [Required]
        public string Password { get; set; }

        public DateTime? DateOfBirth { get; set; }

        public UserEnums.Gender Gender { get; set; }

        public string Address { get; set; }

        [Required]
        public List<Guid> RoleIds { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            var roleRepository = IoCHelper.GetInstance<IRepository<Role>>();
            if (RoleIds.Count <= 0)
            {
                yield return new ValidationResult("Role is required!", new string[] { "RoleIds" });
            }
            foreach (var roleId in RoleIds)
            {
                var role = roleRepository.GetAll().FirstOrDefault(x => x.Id == roleId);
                if (role == null)
                {
                    yield return new ValidationResult("Role is not found!", new string[] { "RoleId" });
                }
            }
        }
    }
}
