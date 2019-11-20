using OMS.Api.Core.Business.Models.Base;
using OMS.Api.Core.Entities;

namespace OMS.API.Core.Business.Models.Sizes
{
    public class SizeViewModel : ApiBaseModel
    {
        public SizeViewModel() : base() { }

        public SizeViewModel(Size size)
        {
            if (size != null)
            {
                Id = size.Id;
                Name = size.Name;
            }
        }
    }
}
