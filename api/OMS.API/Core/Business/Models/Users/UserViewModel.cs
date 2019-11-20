using OMS.Api.Core.Business.Models.Roles;
using OMS.Api.Core.Entities;
using OMS.Api.Core.Entities.Enums;
using System;
using System.Linq;

namespace OMS.Api.Core.Business.Models.Users
{
    public class UserViewModel
    {
        public UserViewModel() { }

        public UserViewModel(User user) : this()
        {
            if (user != null)
            {
                Id = user.Id;
                Name = user.Name;
                DateOfBirth = user.DateOfBirth;
                Age = user.Age;
                Gender = user.Gender;
                Email = user.Email;
                Address = user.Address;
                PhoneNumber = user.PhoneNumber;
                JoinDate = user.CreatedOn;
                Roles = user.UserInRoles != null ? user.UserInRoles.Select(y => new RoleViewModel(y.Role)).ToArray() : null;
            }
        }

        public Guid Id { get; set; }

        public string Name { get; set; }

        public DateTime? DateOfBirth { get; set; }

        public int? Age { get; }

        public UserEnums.Gender Gender { get; set; }

        public string Email { get; set; }

        public string Address { get; set; }

        public string PhoneNumber { get; set; }

        public DateTime? JoinDate { get; set; }

        public RoleViewModel[] Roles { get; set; }
    }
}
