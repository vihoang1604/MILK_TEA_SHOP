using OMS.Api.Core.Business.Models.Users;
using OMS.Api.Core.Business.Services;
using OMS.Api.Core.Common.Helpers;
using OMS.Api.Core.Common.Utilities;
using OMS.Api.Core.DataAccess.Repositories;
using System.Linq;
using System.Threading.Tasks;

namespace OMS.API.Core.Business.Services
{
    public interface ISSOAuthService
    {
        Task<ResponseModel> LoginAsync(UserLoginModel userLoginModel);
    }

    public class SSOAuthService : ISSOAuthService
    {
        private readonly IUserService _userService;
        private readonly IJwtHelper _jwtHelper;

        public SSOAuthService(IUserService userService, IJwtHelper jwtHelper)
        {
            _userService = userService;
            _jwtHelper = jwtHelper;
        }

        public async Task<ResponseModel> LoginAsync(UserLoginModel userLoginModel)
        {
            var user = await _userService.GetByEmailAsync(userLoginModel.Email);
            if (user != null)
            {
                var result = PasswordUtilities.ValidatePass(user.Password, userLoginModel.Password, user.PasswordSalt);
                if (result)
                {
                    var jwtPayload = new JwtPayload()
                    {
                        UserId = user.Id,
                        Email = user.Email,
                        Address = user.Address,
                        Name = user.Name,
                        PhoneNumber = user.PhoneNumber,
                        DateOfBirth = user.DateOfBirth,
                        Gender = user.Gender,
                        RoleIds = user.UserInRoles != null ? user.UserInRoles.Select(x => x.RoleId).ToList() : null
                    };

                    var token = _jwtHelper.GenerateToken(jwtPayload);

                    return new ResponseModel()
                    {
                        StatusCode = System.Net.HttpStatusCode.OK,
                        Data = token
                    };
                }
                else
                {
                    return new ResponseModel()
                    {
                        StatusCode = System.Net.HttpStatusCode.BadRequest,
                        Message = "Email or password is incorrect. Please try again!"
                    };
                }
            }
            else
            {
                return new ResponseModel()
                {
                    StatusCode = System.Net.HttpStatusCode.BadRequest,
                    Message = "Email doesn't exist!"
                };
            }
        }
    }
}
