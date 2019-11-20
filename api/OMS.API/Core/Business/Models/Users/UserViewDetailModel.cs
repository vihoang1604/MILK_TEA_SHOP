using OMS.Api.Core.Business.Models.Roles;
using OMS.Api.Core.Entities;
using OMS.Api.Core.Entities.Enums;
using System;
using System.Linq;

namespace OMS.Api.Core.Business.Models.Users
{
    public class UserViewDetailModel
    {
        public UserViewDetailModel()
        {

        }

        public UserViewDetailModel(User user) : this()
        {
            if (user != null)
            {
                Id = user.Id;
                Name = user.Name;
                Email = user.Email;
                PhoneNumber = user.PhoneNumber;
                DateOfBirth = user.DateOfBirth;
                JoinDate = user.CreatedOn;
                Gender = user.Gender;
                Roles = user.UserInRoles != null ? user.UserInRoles.Select(y => new RoleViewModel(y.Role)).ToArray() : null;
            }
        }

        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public string PhoneNumber { get; set; }

        public string Jobs { get; set; }

        public DateTime? DateOfBirth { get; set; }

        public DateTime? JoinDate { get; set; }

        public UserEnums.Gender Gender { get; set; }

        public RoleViewModel[] Roles { get; set; }
    }
}
