using Microsoft.EntityFrameworkCore;
using OMS.Api.Core.Entities;

namespace OMS.Api.Core.DataAccess
{
    public class OMSDbContext : DbContext
    {
        public OMSDbContext(DbContextOptions<OMSDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }

        public DbSet<Role> Roles { get; set; }

        public DbSet<UserInRole> UserInRoles { get; set; }

        public DbSet<Category> Categories { get; set; }

        public DbSet<Product> Products { get; set; }

        public DbSet<Size> Sizes { get; set; }

        public DbSet<ProductSize> ProductSizes { get; set; }

        public DbSet<Order> Orders { get; set; }

        public DbSet<OrderDetail> OrderDetails { get; set; }
    }
}
