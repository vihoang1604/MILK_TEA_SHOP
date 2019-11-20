using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using OMS.Api.Core.Common.Constants;
using OMS.Api.Core.Entities;
using OMS.Api.Core.DataAccess;
using OMS.Api.Core.DataAccess.Repositories;
using System.Collections.Generic;
using OMS.Api.Core.Business.IoC;
using System.Linq;
using OMS.Api.Core.Common.Utilities;
using OMS.Api.Core.Common.Extensions;
using OMS.Api.Core.Business.Services;
using OMS.Api.Core.Common.Helpers;
using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;
using AutoMapper;
using OMS.Api.Core.Business.Models.Users;
using OMS.API.Core.Business.Services;
using OMS.API.Core.Business.Models.Categories;
using OMS.API.Core.Business.Models.Products;
using OMS.API.Core.Common.Constants;
using OMS.Api.Core.Business.Models;
using System;
using OMS.API.Core.Entities.Enums;
using OMS.Api.Core.Entities.Enums;
using OMS.API.Core.Business.Models.Orders;
using Swashbuckle.AspNetCore.Swagger;
using OMS.API.Core.Business.Filters;

namespace OMS.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        [Obsolete]
        public void ConfigureServices(IServiceCollection services)
        {
            // Add service and create Policy with options
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                  builder => builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials());
            });

            services.AddMvc().AddJsonOptions(opt =>
            {
                opt.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            })
              .AddJsonOptions(opt =>
              {
                  opt.SerializerSettings.DateTimeZoneHandling = DateTimeZoneHandling.Utc;
              });

            services.AddSingleton(Configuration);
            services.Configure<AppSettings>(Configuration.GetSection("AppSettings"));

            Mapper.Initialize(config =>
            {
                config.CreateMap<User, UserLoginModel>().ReverseMap();
                config.CreateMap<User, UserRegisterModel>().ReverseMap();
                config.CreateMap<User, UserUpdateProfileModel>().ReverseMap();
                config.CreateMap<Category, CategoryManageModel>().ReverseMap();
                config.CreateMap<Product, ProductManageModel>().ReverseMap();
                config.CreateMap<ProductSize, ProductSizeManageModel>().ReverseMap();
                config.CreateMap<Order, OrderCreateModel>().ReverseMap();
                config.CreateMap<OrderDetail, OrderDetailManageModel>().ReverseMap();
            });

            services.AddDbContext<OMSDbContext>(options =>
            {
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnectionString"));
            });

            //Register JwtHelper
            services.AddScoped<IJwtHelper, JwtHelper>();

            //Register Repository
            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));

            // Register service
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IRoleService, RoleService>();
            services.AddScoped<ISSOAuthService, SSOAuthService>();
            services.AddScoped<ICategoryService, CategoryService>();
            services.AddScoped<IProductService, ProductService>();
            services.AddScoped<ISizeService, SizeService>();
            services.AddScoped<IOrderService, OrderService>();

            // Set Service Provider for IoC Helper
            IoCHelper.SetServiceProvider(services.BuildServiceProvider());

            // Add Swagger
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info
                {
                    Version = "v1",
                    Title = "OMS API",
                    Description = "ASP.NET Core API.",
                    TermsOfService = "None",
                    Contact = new Contact { Name = "TRAN VAN TAI", Email = "ngoctai.dev@gmail.com", Url = "" },
                });

                c.DescribeAllParametersInCamelCase();
                c.OperationFilter<AccessTokenHeaderParameterOperationFilter>();
            });

            services.AddAuthentication(Microsoft.AspNetCore.Server.IISIntegration.IISDefaults.AuthenticationScheme);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            // global policy - assign here or on each controller
            app.UseCors("CorsPolicy");

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseHttpsRedirection();

            app.UseMvc();

            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.), specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "OMS API V1");
            });

            app.UseAuthentication();

            // Run Migration
            RunMigration(app);

            // Initialize Data
            InitCategories();
            InitSizes();
            InitProducts();
            InitDataRole();
            InitUserAdmin();
            //InitUsers();
        }

        private void RunMigration(IApplicationBuilder app)
        {
            using (var scope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                scope.ServiceProvider.GetRequiredService<OMSDbContext>().Database.Migrate();
            }
        }

        private void InitDataRole()
        {
            var roleRepository = IoCHelper.GetInstance<IRepository<Role>>();

            var roles = new[]
            {
                new Role {
                    Id = RoleConstants.SuperAdminId,
                    Name = "Super Admin"
                },
                new Role {
                    Id = RoleConstants.CustomerId,
                    Name = "Customer"
                }
            };

            roleRepository.GetDbContext().Roles.AddIfNotExist(x => x.Name, roles);
            roleRepository.GetDbContext().SaveChanges();
        }

        private void InitUserAdmin()
        {
            var userRepository = IoCHelper.GetInstance<IRepository<User>>();
            if (userRepository.GetAll().Count() > 0)
            {
                return;// It's already init
            }

            var user = new User();
            user.Email = "ngoctai.dev@gmail.com";
            var password = "abcd@1234";
            password.GeneratePassword(out string saltKey, out string hashPass);

            user.Name = "Đặng Thành Tài";
            user.Address = "Thái Thủy, Lệ Thủy, Quảng Bình";
            user.DateOfBirth = new DateTime(1999, 01, 29);
            user.Gender = UserEnums.Gender.Male;
            user.PhoneNumber = "0915981110";
            user.Password = hashPass;
            user.PasswordSalt = saltKey;

            user.UserInRoles = new List<UserInRole>()
            {
                new UserInRole()
                {
                    UserId = UserConstants.SuperAdminUserId,
                    RoleId = RoleConstants.SuperAdminId
                }
            };

            var users = new[]
            {
                user
            };

            userRepository.GetDbContext().Users.AddIfNotExist(x => x.Email, users);
            userRepository.GetDbContext().SaveChanges();
        }

        private void InitUsers()
        {
            var userRepository = IoCHelper.GetInstance<IRepository<User>>();

            var user = new User();
            user.Email = "tai.tran@gmail.com";
            var password = "Tai16031999";
            password.GeneratePassword(out string saltKey, out string hashPass);

            user.Name = "Trần Văn Tài";
            user.Address = "101B Lê Hữu Trác, Sơn Trà, Đà Nẵng";
            user.DateOfBirth = new DateTime(1999, 03, 16);
            user.Gender = UserEnums.Gender.Male;
            user.PhoneNumber = "0915981110";
            user.Password = hashPass;
            user.PasswordSalt = saltKey;
            user.RecordActive = true;

            user.UserInRoles = new List<UserInRole>()
                    {
                        new UserInRole()
                        {
                            UserId = user.Id,
                            RoleId = RoleConstants.CustomerId,
                            RecordActive = true
                        }
                    };

            user.Orders = new List<Order>()
                    {
                        InitOrder(user.Id)
                    };

            var users = new[]
            {
                user
            };

            userRepository.GetDbContext().Users.AddIfNotExist(x => x.Email, users);
            userRepository.GetDbContext().SaveChanges();
        }

        private void InitCategories()
        {
            var categoryRepository = IoCHelper.GetInstance<IRepository<Category>>();

            var categories = new[]
            {
                new Category(CategoryConstants.FirstCategoryId, CategoryConstants.FirstCategoryName, ""),
                new Category(CategoryConstants.SecondCategoryId, CategoryConstants.SecondCategoryName, ""),
                new Category(CategoryConstants.ThirdCategoryId, CategoryConstants.ThirdCategoryName, "")
            };

            categoryRepository.GetDbContext().Categories.AddIfNotExist(x => x.Name, categories);
            categoryRepository.GetDbContext().SaveChanges();
        }

        private void InitSizes()
        {
            var sizeRepository = IoCHelper.GetInstance<IRepository<Size>>();

            var sizes = new[]
            {
                new Size(SizeConstants.Medium.Id, SizeConstants.Medium.Name),
                new Size(SizeConstants.Large.Id, SizeConstants.Large.Name)
            };

            sizeRepository.GetDbContext().Sizes.AddIfNotExist(x => x.Name, sizes);
            sizeRepository.GetDbContext().SaveChanges();
        }

        private void InitProducts()
        {
            var productRepository = IoCHelper.GetInstance<IRepository<Product>>();

            var products = new[]
            {
                new Product()
                {
                    Name = "Trà Đào Hạt Chia",
                    Image = "http://localhost:6600/api/media/ProductImage/4a92b1fd-6a2d-47bb-be53-bc71e0876f87.jpg",
                    CategoryId = CategoryConstants.SecondCategoryId,
                    ProductSizes = new List<ProductSize>()
                    {
                        InitProductSizes(new Guid(), SizeConstants.Medium.Id, 20000),
                        InitProductSizes(new Guid(), SizeConstants.Large.Id, 30000)
                    },
                    RecordActive = true
                },
                new Product()
                {
                    Name = "Trà Đào Đường Đen",
                    Image = "http://localhost:6600/api/media/ProductImage/201862816548-tra-sua-toco.jpg",
                    CategoryId = CategoryConstants.SecondCategoryId,
                    ProductSizes = new List<ProductSize>()
                    {
                        InitProductSizes(new Guid(), SizeConstants.Medium.Id, 25000),
                        InitProductSizes(new Guid(), SizeConstants.Large.Id, 35000)
                    },
                    RecordActive = true
                },
                new Product()
                {
                    Name = "Trà Sữa Sôcôla",
                    Image = "http://localhost:6600/api/media/ProductImage/2018416153535-hongtravietquat.jpg",
                    CategoryId = CategoryConstants.FirstCategoryId,
                    ProductSizes = new List<ProductSize>()
                    {
                        InitProductSizes(new Guid(), SizeConstants.Medium.Id, 30000),
                        InitProductSizes(new Guid(), SizeConstants.Large.Id, 38000)
                    },
                    RecordActive = true
                },
                new Product()
                {
                    Name = "Trà Sữa Bạc Hà",
                    Image = "http://localhost:6600/api/media/ProductImage/2018628165317-tra-sua-panda-new-.jpg",
                    CategoryId = CategoryConstants.FirstCategoryId,
                    ProductSizes = new List<ProductSize>()
                    {
                        InitProductSizes(new Guid(), SizeConstants.Medium.Id, 20000),
                        InitProductSizes(new Guid(), SizeConstants.Large.Id, 28000)
                    },
                    RecordActive = true
                },
                new Product()
                {
                    Name = "Trà Sữa Hương Dâu",
                    Image = "http://localhost:6600/api/media/ProductImage/2018629104230-o-long-kem-pho-mai.jpg",
                    CategoryId = CategoryConstants.FirstCategoryId,
                    ProductSizes = new List<ProductSize>()
                    {
                        InitProductSizes(new Guid(), SizeConstants.Medium.Id, 24000),
                        InitProductSizes(new Guid(), SizeConstants.Large.Id, 30000)
                    },
                    RecordActive = true
                }
            };

            productRepository.GetDbContext().Products.AddIfNotExist(x => x.Name, products);
            productRepository.GetDbContext().SaveChanges();
        }

        private ProductSize InitProductSizes(Guid productId, Guid sizeId, decimal price)
        {
            return new ProductSize()
            {
                ProductId = productId,
                SizeId = sizeId,
                Price = price,
                RecordActive = true
            };
        }

        public Order InitOrder(Guid userId)
        {
            var order = new Order()
            {
                UserId = userId,
                Note = "Để đá ngoài",
                DeliveryAddress = "101B Lê Hữu Trác, Sơn Trà, Đà Nẵng",
                Status = OrderEnums.Status.WaitingForShipping,
                RecordActive = true
            };

            order.OrderDetails = new List<OrderDetail>()
                    {
                        new OrderDetail()
                        {
                            OrderId = order.Id,
                            ProductSizeId = new Guid("1B4CF547-39BA-4D2F-B298-89FCD1B02B82"),
                            Quantity = 2,
                            Price = 38000,
                            RecordActive = true
                        },
                        new OrderDetail()
                        {
                            OrderId = order.Id,
                            ProductSizeId = new Guid("9E750953-71DA-4B0D-8EE3-6A2863297834"),
                            Quantity = 3,
                            Price = 35000,
                            RecordActive = true
                        }
                    };

            return order;
        }
    }
}