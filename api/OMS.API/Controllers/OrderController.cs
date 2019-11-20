using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using OMS.API.Core.Business.Models.Orders;
using OMS.API.Core.Business.Services;
using System;
using System.Threading.Tasks;

namespace OMS.API.Controllers
{
    [Route("api/orders")]
    [EnableCors("CorsPolicy")]
    public class OrderController : Controller
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpGet]
        //[CustomAuthorize]
        public async Task<IActionResult> Get(OrderRequestListViewModel productRequestListViewModel)
        {
            var orders = await _orderService.ListOrderAsync(productRequestListViewModel);
            return Ok(orders);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var orders = await _orderService.GetOrderByIdAsync(id);
            return Ok(orders);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] OrderCreateModel orderCreateModel)
        {
            var responseModel = await _orderService.CreateOrderAsync(orderCreateModel);
            if (responseModel.StatusCode == System.Net.HttpStatusCode.OK)
            {
                return Ok((OrderViewModel)responseModel.Data);
            }
            return BadRequest(responseModel.Message);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] OrderManageModel orderManageModel)
        {
            var responseModel = await _orderService.UpdateOrderStatusAsync(id, orderManageModel);
            if (responseModel.StatusCode == System.Net.HttpStatusCode.OK)
            {
                return Ok(responseModel.Data);
            }
            return BadRequest(responseModel.Message);
        }
    }
}
