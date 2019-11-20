using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using OMS.API.Core.Business.Filters;
using OMS.API.Core.Business.Models.Products;
using OMS.API.Core.Business.Services;
using System;
using System.Threading.Tasks;

namespace OMS.API.Controllers
{
    [Route("api/products")]
    [EnableCors("CorsPolicy")]
    [ValidateModel]
    public class ProductController : Controller
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public async Task<IActionResult> Get(ProductRequestListViewModel productRequestListViewModel)
        {
            var products = await _productService.ListProductAsync(productRequestListViewModel);
            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var product = await _productService.GetProductByIdAsync(id);
            if (product != null)
            {
                return Ok(product);
            }
            return NotFound("This product has not existed!");
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ProductManageModel productManageModel)
        {
            var responseModel = await _productService.CreateProductAsync(productManageModel);
            if (responseModel.StatusCode == System.Net.HttpStatusCode.OK)
            {
                var product = (ProductViewModel)responseModel.Data;
                return Ok(product);
            }
            return BadRequest(responseModel.Message);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] ProductManageModel productManageModel)
        {
            var responseModel = await _productService.UpdateProductAsync(id, productManageModel);
            if (responseModel.StatusCode == System.Net.HttpStatusCode.OK)
            {
                return Ok(responseModel.Data);
            }
            return BadRequest(responseModel.Message);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var responseModel = await _productService.DeleteProductAsync(id);
            if (responseModel.StatusCode == System.Net.HttpStatusCode.OK)
            {
                var product = (ProductViewModel)responseModel.Data;
                return Ok(product);
            }
            return BadRequest(responseModel.Message);
        }
    }
}
