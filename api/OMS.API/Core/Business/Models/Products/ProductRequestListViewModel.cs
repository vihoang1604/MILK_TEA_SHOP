using OMS.Api.Core.Business.Models.Base;

namespace OMS.API.Core.Business.Models.Products
{
    public class ProductRequestListViewModel : RequestListViewModel
    {
        public ProductRequestListViewModel() : base() { }

        public string Query { get; set; }
        public bool? IsActive { get; set; }
    }
}
