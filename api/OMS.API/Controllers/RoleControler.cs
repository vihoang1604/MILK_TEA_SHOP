using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using OMS.Api.Core.Business.Models.Roles;
using OMS.Api.Core.Business.Services;
using System.Threading.Tasks;

namespace OMS.Api.Controllers
{
    [Route("api/roles")]
    [EnableCors("CorsPolicy")]
    public class RoleController : Controller
    {
        private readonly IRoleService _roleService;

        public RoleController(IRoleService roleService)
        {
            _roleService = roleService;
        }

        [HttpGet]
        public async Task<IActionResult> Get(RoleRequestListViewModel roleRequestListViewModel)
        {
            var roles = await _roleService.ListRoleAsync(roleRequestListViewModel);
            return Ok(roles);
        }

        [HttpGet("by-name")]
        public async Task<IActionResult> GetByName(string name)
        {
            var role = await _roleService.GetRoleByNameAsync(name);
            if (role != null)
            {
                return Ok(role);
            }
            return NotFound("Role not found. Please try again!");
        }
    }
}
