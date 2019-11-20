using OMS.Api.Core.Entities;
using System;

namespace OMS.Api.Core.Business.Models.UserInRoles
{
    public class BaseUserInRoleViewModel
    {
        public BaseUserInRoleViewModel()
        {

        }

        public BaseUserInRoleViewModel(UserInRole userInRole) : this()
        {
            if (userInRole != null)
            {
                Id = userInRole.Id;
                UserId = userInRole.UserId;
                RoleId = userInRole.RoleId;
            }
        }

        public Guid Id { get; set; }

        public Guid UserId { get; set; }

        public Guid RoleId { get; set; }
    }
}
