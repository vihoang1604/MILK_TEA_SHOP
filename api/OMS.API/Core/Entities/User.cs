using OMS.Api.Core.Entities.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OMS.Api.Core.Entities
{
    [Table("User")]
    public class User : BaseEntity
    {
        public User() : base() { }

        public User(string email) : this()
        {
            Email = email;
        }

        public int? Age
        {
            get
            {
                if (DateOfBirth.HasValue)
                {
                    return (int)(DateTime.Now - DateOfBirth.Value).TotalDays / 365;
                }
                return null;
            }
        }

        [StringLength(255)]
        public string Email { get; set; }

        [StringLength(512)]
        [Required]
        public string Password { get; set; }

        [StringLength(512)]
        [Required]
        public string PasswordSalt { get; set; }

        [StringLength(512)]
        [Required]
        public string Name { get; set; }

        [StringLength(50)]

        public DateTime? DateOfBirth { get; set; }

        public UserEnums.Gender Gender { get; set; }

        [StringLength(11)]
        public string PhoneNumber { get; set; }

        [StringLength(1024)]
        public string Address { get; set; }

        [StringLength(512)]
        public string Facebook { get; set; }

        [StringLength(512)]
        public string Twitter { get; set; }

        [StringLength(512)]
        public string LinkedIn { get; set; }

        public string ResetPasswordCode { get; set; }

        public DateTime? ResetPasswordExpiryDate { get; set; }

        public List<UserInRole> UserInRoles { get; set; }

        public List<Order> Orders { get; set; }
    }
}