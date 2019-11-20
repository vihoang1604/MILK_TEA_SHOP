using System.ComponentModel.DataAnnotations;

namespace OMS.Api.Core.Business.Models.Users
{
    public class UserLoginModel
    {
        [StringLength(512)]
        [EmailAddress]
        [Required]
        public string Email { get; set; }

        [StringLength(512)]
        [Required]
        public string Password { get; set; }
    }
}
