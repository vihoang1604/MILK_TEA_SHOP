using OMS.Api.Core.Business.Models.Base;

namespace OMS.API.Core.Business.Models.Orders
{
    public class OrderRequestListViewModel : RequestListViewModel
    {
        public OrderRequestListViewModel() : base() { }

        public string Query { get; set; }
        public bool? IsActive { get; set; }
    }
}
