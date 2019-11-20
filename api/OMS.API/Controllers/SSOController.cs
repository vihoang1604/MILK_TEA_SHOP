using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using OMS.Api.Core.Business.Models.Users;
using OMS.Api.Core.Business.Services;
using OMS.API.Core.Business.Filters;
using OMS.API.Core.Business.Services;
using System.Threading.Tasks;

namespace OMS.API.Controllers
{
    [Route("api/sso")]
    [EnableCors("CorsPolicy")]
    [ValidateModel]
    public class SSOController : Controller
    {
        private readonly ISSOAuthService _ssoService;
        private readonly IUserService _userService;

        public SSOController(ISSOAuthService ssoService, IUserService userService)
        {
            _ssoService = ssoService;
            _userService = userService;
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromBody] UserRegisterModel userRegisterModel)
        {
            var responseModel = await _userService.RegisterAsync(userRegisterModel);
            if (responseModel.StatusCode == System.Net.HttpStatusCode.OK)
            {
                return Ok(responseModel.Data);
            }
            return BadRequest(responseModel.Message);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginModel userLoginModel)
        {
            var responseModel = await _ssoService.LoginAsync(userLoginModel);
            if (responseModel.StatusCode == System.Net.HttpStatusCode.OK)
            {
                return Ok(responseModel.Data);
            }
            return BadRequest(responseModel.Message);
        }
    }
}
