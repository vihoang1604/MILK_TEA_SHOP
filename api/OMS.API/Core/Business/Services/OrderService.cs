using Microsoft.EntityFrameworkCore;
using OMS.Api.Core.Business.Models.Base;
using OMS.Api.Core.Common.Constants;
using OMS.Api.Core.Common.Reflections;
using OMS.Api.Core.DataAccess.Repositories;
using OMS.Api.Core.Entities;
using OMS.API.Core.Business.Models.Orders;
using OMS.API.Core.Entities.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OMS.API.Core.Business.Services
{
    public interface IOrderService
    {
        Task<PagedList<OrderViewModel>> ListOrderAsync(OrderRequestListViewModel orderRequestListViewModel);
        Task<ResponseModel> GetOrderByIdAsync(Guid id);
        Task<ResponseModel> CreateOrderAsync(OrderCreateModel orderCreateModel);
        Task<ResponseModel> UpdateOrderStatusAsync(Guid id, OrderManageModel orderManageModel);
    }

    public class OrderService : IOrderService
    {
        private readonly IRepository<Order> _orderRepository;

        public OrderService(IRepository<Order> orderRepository)
        {
            _orderRepository = orderRepository;
        }

        public async Task<PagedList<OrderViewModel>> ListOrderAsync(OrderRequestListViewModel orderRequestListViewModel)
        {
            var list = await GetAll()
                .Where(x => (string.IsNullOrEmpty(orderRequestListViewModel.Query)
                    || (x.UserId.Equals(new Guid(orderRequestListViewModel.Query)))))
                .Select(x => new OrderViewModel(x)).ToListAsync();

            var type = typeof(OrderViewModel);

            var orderViewModelProperties = GetAllPropertyNameOfCategoryViewModel();
            var requestPropertyName = !string.IsNullOrEmpty(orderRequestListViewModel.SortName) ? orderRequestListViewModel.SortName.ToLower() : string.Empty;
            string matchedPropertyName = string.Empty;

            foreach (var orderViewModelProperty in orderViewModelProperties)
            {
                var lowerProductViewModelProperty = orderViewModelProperty.ToLower();
                if (lowerProductViewModelProperty.Equals(requestPropertyName))
                {
                    matchedPropertyName = orderViewModelProperty;
                }
            }

            if (string.IsNullOrEmpty(matchedPropertyName))
            {
                matchedPropertyName = "Status";
            }

            var sortProperty = type.GetProperty(matchedPropertyName);

            list = orderRequestListViewModel.IsDesc ? list.OrderByDescending(x => sortProperty.GetValue(x, null)).ToList() : list.OrderBy(x => sortProperty.GetValue(x, null)).ToList();

            return new PagedList<OrderViewModel>(list, orderRequestListViewModel.Offset ?? CommonConstants.Config.DEFAULT_SKIP, orderRequestListViewModel.Limit ?? CommonConstants.Config.DEFAULT_TAKE);
        }

        public async Task<ResponseModel> GetOrderByIdAsync(Guid id)
        {
            var order = await GetAll().FirstOrDefaultAsync(x => x.Id == id);
            if (order != null)
            {
                return new ResponseModel()
                {
                    StatusCode = System.Net.HttpStatusCode.OK,
                    Data = new OrderViewModel(order)
                };
            }
            return new ResponseModel()
            {
                StatusCode = System.Net.HttpStatusCode.NotFound,
                Message = "Order not found!"
            };
        }

        public async Task<ResponseModel> CreateOrderAsync(OrderCreateModel orderCreateModel)
        {
            var existedOrders = await GetAll()
                .Where(x => x.UserId == orderCreateModel.UserId
                    && x.Status != OrderEnums.Status.Received
                    && x.Status != OrderEnums.Status.Canceled)
                        .ToListAsync();

            if (existedOrders != null && existedOrders.Any())
            {
                if (existedOrders.Count >= 5)
                {
                    return new ResponseModel()
                    {
                        StatusCode = System.Net.HttpStatusCode.BadRequest,
                        Message = "Please wait. You are having 5 orders have not delivered yet!"
                    };
                }
            }

            var order = AutoMapper.Mapper.Map<Order>(orderCreateModel);

            await _orderRepository.InsertAsync(order);

            order = await GetAll().FirstOrDefaultAsync(x => x.Id == order.Id);

            return new ResponseModel()
            {
                StatusCode = System.Net.HttpStatusCode.OK,
                Data = new OrderViewModel(order)
            };
        }

        public async Task<ResponseModel> UpdateOrderStatusAsync(Guid id, OrderManageModel orderManageModel)
        {
            var order = await GetAll().FirstOrDefaultAsync(x => x.Id == id);
            if (order != null)
            {
                if (Enum.IsDefined(typeof(OrderEnums.Status), orderManageModel.Status))
                {
                    orderManageModel.SetOrderModel(order);
                }
                else
                {
                    return new ResponseModel()
                    {
                        StatusCode = System.Net.HttpStatusCode.NotFound,
                        Message = "Status code not found!"
                    };
                }

                await _orderRepository.UpdateAsync(order);

                order = await GetAll().FirstOrDefaultAsync(x => x.Id == id);

                return new ResponseModel()
                {
                    StatusCode = System.Net.HttpStatusCode.OK,
                    Data = new OrderViewModel(order)
                };
            }
            return new ResponseModel()
            {
                StatusCode = System.Net.HttpStatusCode.NotFound,
                Message = "Order not found!"
            };
        }

        private List<string> GetAllPropertyNameOfCategoryViewModel()
        {
            var orderViewModel = new OrderViewModel();
            var type = orderViewModel.GetType();

            return ReflectionUtilities.GetAllPropertyNamesOfType(type);
        }

        private IQueryable<Order> GetAll()
        {
            return _orderRepository.GetAll()
                .Include(x => x.User)
                .Include(x => x.OrderDetails)
                    .ThenInclude(x => x.ProductSize)
                        .ThenInclude(x => x.Product)
                .Include(x => x.OrderDetails)
                    .ThenInclude(x => x.ProductSize)
                        .ThenInclude(x => x.Size)
                .Where(x => x.RecordActive);
        }
    }
}
