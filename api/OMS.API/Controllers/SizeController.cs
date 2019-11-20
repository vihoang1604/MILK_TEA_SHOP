using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using OMS.API.Core.Business.Models.Sizes;
using OMS.API.Core.Business.Services;
using System.Threading.Tasks;

namespace OMS.API.Controllers
{
    [Route("api/sizes")]
    [EnableCors("CorsPolicy")]
    public class SizeController : Controller
    {
        private readonly ISizeService _sizeService;

        public SizeController(ISizeService sizeService)
        {
            _sizeService = sizeService;
        }

        [HttpGet]
        public async Task<IActionResult> Get(SizeRequestListViewModel sizeRequestListViewModel)
        {
            var responseModel = await _sizeService.ListSizeAsync(sizeRequestListViewModel);
            if (responseModel.StatusCode == System.Net.HttpStatusCode.OK)
            {
                return Ok(responseModel.Data);
            }
            return BadRequest(responseModel.Message);
        }
    }
}
