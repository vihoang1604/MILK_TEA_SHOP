using OMS.Api.Core.Business.Models.Base;

namespace OMS.API.Core.Business.Models.Sizes
{
    public class SizeRequestListViewModel : RequestListViewModel
    {
        public SizeRequestListViewModel() : base() { }

        public string Query { get; set; }
        public bool? IsActive { get; set; }
    }
}
