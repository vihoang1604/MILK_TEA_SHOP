using OMS.Api.Core.Entities;
using OMS.Api.Core.Entities.Enums;

namespace OMS.API.Core.Business.Models.Orders
{
    public class CustomerViewModel
    {
        public CustomerViewModel() { }

        public CustomerViewModel(User user) : this()
        {
            if (user != null)
            {
                Name = user.Name;
                Age = user.Age;
                Gender = user.Gender;
                Email = user.Email;
                PhoneNumber = user.PhoneNumber;
            }
        }

        public string Name { get; set; }

        public int? Age { get; }

        public UserEnums.Gender Gender { get; set; }

        public string Email { get; set; }

        public string PhoneNumber { get; set; }
    }
}
