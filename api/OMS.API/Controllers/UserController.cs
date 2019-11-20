using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using OMS.Api.Core.Business.Models.Users;
using OMS.Api.Core.Business.Services;
using OMS.Api.Core.Entities;

namespace OMS.Api.Controllers
{
    [Route("api/users")]
    [EnableCors("CorsPolicy")]
    public class UserController : Controller
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<IActionResult> Get(UserRequestListViewModel userRequestListViewModel)
        {
            var users = await _userService.ListUserAsync(userRequestListViewModel);
            return Ok(users);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(Guid id, [FromBody] UserUpdateProfileModel userUpdateProfileModel)
        {
            var responseModel = await _userService.UpdateProfileAsync(id, userUpdateProfileModel);
            if (responseModel.StatusCode == System.Net.HttpStatusCode.NotFound)
            {
                return NotFound("User is not found. Please try again!");
            }
            if (responseModel.StatusCode == System.Net.HttpStatusCode.OK)
            {
                return Ok(new UserViewDetailModel((User)responseModel.Data));
            }
            return BadRequest(responseModel.Message);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var responseModel = await _userService.DeleteUserAsync(id);
            if (responseModel.StatusCode == System.Net.HttpStatusCode.OK)
            {
                return Ok(responseModel.Data);
            }
            return BadRequest(responseModel.Message);
        }
    }
}