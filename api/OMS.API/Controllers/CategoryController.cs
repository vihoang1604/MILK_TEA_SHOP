using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using OMS.API.Core.Business.Models.Categories;
using OMS.API.Core.Business.Services;

namespace OMS.API.Controllers
{
    [Route("api/categories")]
    [EnableCors("CorsPolicy")]
    public class CategoryController : Controller
    {
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet]
        public async Task<IActionResult> Get(CategoryRequestListViewModel categoryRequestListViewModel)
        {
            var categories = await _categoryService.ListCategoryAsync(categoryRequestListViewModel);
            return Ok(categories);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategoryById(Guid id)
        {
            var category = await _categoryService.GetCategoryByIdAsync(id);

            if (category != null)
            {
                return Ok(category);
            }
            return NotFound("This category has not existed!");
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CategoryManageModel categoryManageModel)
        {
            var responseModel = await _categoryService.CreateCategoryAsync(categoryManageModel);
            if (responseModel.StatusCode == System.Net.HttpStatusCode.OK)
            {
                var category = (CategoryViewModel)responseModel.Data;
                return Ok(category);
            }
            else
            {
                return BadRequest(responseModel.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] CategoryManageModel categoryManageModel)
        {
            var responseModel = await _categoryService.UpdateCategoryAsync(id, categoryManageModel);
            if (responseModel.StatusCode == System.Net.HttpStatusCode.OK)
            {
                return Ok(responseModel.Data);
            }
            else
            {
                return BadRequest(responseModel.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var responseModel = await _categoryService.DeleteCategoryAsync(id);
            if (responseModel.StatusCode == System.Net.HttpStatusCode.OK)
            {
                return Ok(responseModel.Data);
            }
            else
            {
                return BadRequest(responseModel.Message);
            }
        }
    }
}
