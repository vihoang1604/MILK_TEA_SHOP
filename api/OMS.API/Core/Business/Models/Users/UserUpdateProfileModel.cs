using OMS.Api.Core.Entities;
using OMS.Api.Core.Entities.Enums;
using System;
using System.Collections.Generic;

namespace OMS.Api.Core.Business.Models.Users
{
    public class UserUpdateProfileModel
    {
        public string Name { get; set; }

        public string PhoneNumber { get; set; }

        public DateTime? DateOfBirth { get; set; }

        public UserEnums.Gender Gender { get; set; }

        public List<Guid> RoleIds { get; set; }

        public void SetUserModel(User user)
        {
            user.Name = Name;
            user.PhoneNumber = PhoneNumber;
            user.DateOfBirth = DateOfBirth;
            user.Gender = Gender;
        }
    }
}
