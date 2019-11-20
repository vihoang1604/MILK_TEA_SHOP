using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using OMS.Api.Core.Common.Helpers;
using OMS.API.Core.Common.Constants;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;

namespace OMS.API.Core.Business.Filters
{
    public class CustomAuthorizeAttribute : ActionFilterAttribute
    {
        //private readonly UserHelpers _userHelpers = IoCHelper.GetInstance<UserHelpers>();
        public string[] Roles { get; set; }
        /// <summary>
        /// Override OnActionExecuting to check Access Token and Role
        /// </summary>
        /// <param name="context"></param>
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            var jwtHelper = (IJwtHelper)context.HttpContext.RequestServices.GetService(typeof(IJwtHelper));
            var accessToken = context.HttpContext.Request.Headers["x-access-token"].ToString();
            var jwtPayload = jwtHelper.ValidateToken(accessToken);

            if (jwtPayload == null)
            {
                context.HttpContext.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                context.Result = new JsonResult(MessageConstants.INVALID_ACCESS_TOKEN);
            }
            else if (Roles != null && Roles.Length > 0)
            {
                bool isUserInRole = IsUserInRole(Roles, jwtPayload.RoleIds);
                if (!isUserInRole)
                {
                    context.HttpContext.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                    context.Result = new JsonResult("Unauthorized request");
                }
            }
            base.OnActionExecuting(context);
        }

        private bool IsUserInRole(string[] allowRoles, List<Guid> currentRoleIds)
        {
            if (currentRoleIds == null || currentRoleIds.Count <= 0)
            {
                return false;
            }

            foreach (var role in allowRoles)
            {
                var roleId = Guid.Parse(role);
                return currentRoleIds.Any(x => x == roleId);
            }
            return false;
        }
    }
}
