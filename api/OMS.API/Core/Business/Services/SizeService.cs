using Microsoft.EntityFrameworkCore;
using OMS.Api.Core.Common.Reflections;
using OMS.Api.Core.DataAccess.Repositories;
using OMS.Api.Core.Entities;
using OMS.API.Core.Business.Models.Sizes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OMS.API.Core.Business.Services
{
    public interface ISizeService
    {
        Task<ResponseModel> ListSizeAsync(SizeRequestListViewModel sizeRequestListViewModel);
    }

    public class SizeService : ISizeService
    {
        private readonly IRepository<Size> _sizeRepository;

        public SizeService(IRepository<Size> sizeRepository)
        {
            _sizeRepository = sizeRepository;
        }

        public async Task<ResponseModel> ListSizeAsync(SizeRequestListViewModel sizeRequestListViewModel)
        {
            var list = await GetAll().Where(x => (string.IsNullOrEmpty(sizeRequestListViewModel.Query)
                        || (x.Name.Contains(sizeRequestListViewModel.Query)))
                    ).Select(x => new SizeViewModel(x)).ToListAsync();

            var sizeViewModelProperties = GetAllPropertyNameOfViewModel();
            var requestPropertyName = !string.IsNullOrEmpty(sizeRequestListViewModel.SortName) ? sizeRequestListViewModel.SortName.ToLower() : string.Empty;
            string matchedPropertyName = string.Empty;

            foreach (var sizeViewModelProperty in sizeViewModelProperties)
            {
                var lowerTypeViewModelProperty = sizeViewModelProperty.ToLower();
                if (lowerTypeViewModelProperty.Equals(requestPropertyName))
                {
                    matchedPropertyName = sizeViewModelProperty;
                    break;
                }
            }

            if (string.IsNullOrEmpty(matchedPropertyName))
            {
                matchedPropertyName = "Name";
            }

            var type = typeof(SizeViewModel);
            var sortProperty = type.GetProperty(matchedPropertyName);

            list = sizeRequestListViewModel.IsDesc ? list.OrderByDescending(x => sortProperty.GetValue(x, null)).ToList() : list.OrderBy(x => sortProperty.GetValue(x, null)).ToList();

            return new ResponseModel()
            {
                StatusCode = System.Net.HttpStatusCode.OK,
                Data = list
            };
        }

        public IQueryable<Size> GetAll()
        {
            return _sizeRepository.GetAll().Where(x => !x.RecordDeleted);
        }

        private List<string> GetAllPropertyNameOfViewModel()
        {
            var sizeViewModel = new SizeViewModel();
            var type = sizeViewModel.GetType();

            return ReflectionUtilities.GetAllPropertyNamesOfType(type);
        }
    }
}
