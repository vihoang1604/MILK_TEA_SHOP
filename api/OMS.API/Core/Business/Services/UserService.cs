using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using OMS.Api.Core.Business.Models.Base;
using OMS.Api.Core.Common.Utilities;
using OMS.Api.Core.DataAccess.Repositories;
using OMS.Api.Core.Entities;
using OMS.Api.Core.Common.Constants;
using OMS.Api.Core.Common.Reflections;
using OMS.Api.Core.Business.Models.Users;
using OMS.Api.Core.Common.Helpers;

namespace OMS.Api.Core.Business.Services
{
    public interface IUserService
    {
        Task<PagedList<UserViewModel>> ListUserAsync(UserRequestListViewModel userRequestListViewModel);

        Task<ResponseModel> RegisterAsync(UserRegisterModel userRegisterModel);

        Task<ResponseModel> UpdateProfileAsync(Guid id, UserUpdateProfileModel userUpdateProfileModel);

        Task<ResponseModel> DeleteUserAsync(Guid id);

        Task<User> GetByIdAsync(Guid? id);

        Task<User> GetByEmailAsync(string email);
    }

    public class UserService : IUserService
    {
        private readonly IRepository<User> _userRepository;
        private readonly IRepository<UserInRole> _userInRoleRepository;
        private readonly IJwtHelper _jwtHelper;

        public UserService(IRepository<User> userRepository, IRepository<UserInRole> userInRoleRepository, IJwtHelper jwtHelper)
        {
            _userRepository = userRepository;
            _userInRoleRepository = userInRoleRepository;
            _jwtHelper = jwtHelper;
        }

        private IQueryable<User> GetAll()
        {
            return _userRepository.GetAll()
                        .Include(x => x.UserInRoles)
                            .ThenInclude(user => user.Role)
                    .Where(x => !x.RecordDeleted);
        }

        private List<string> GetAllPropertyNameOfUserViewModel()
        {
            var userViewModel = new UserViewModel();
            var type = userViewModel.GetType();

            return ReflectionUtilities.GetAllPropertyNamesOfType(type);
        }

        public async Task<PagedList<UserViewModel>> ListUserAsync(UserRequestListViewModel userRequestListViewModel)
        {
            var list = await GetAll()
            .Where(x => (!userRequestListViewModel.IsActive.HasValue || x.RecordActive == userRequestListViewModel.IsActive)
                && (string.IsNullOrEmpty(userRequestListViewModel.Query)
                    || (x.Name.Contains(userRequestListViewModel.Query)
                    || (x.Email.Contains(userRequestListViewModel.Query)
                    ))))
                .Select(x => new UserViewModel(x)).ToListAsync();

            var userViewModelProperties = GetAllPropertyNameOfUserViewModel();
            var requestPropertyName = !string.IsNullOrEmpty(userRequestListViewModel.SortName) ? userRequestListViewModel.SortName.ToLower() : string.Empty;
            string matchedPropertyName = string.Empty;

            foreach (var userViewModelProperty in userViewModelProperties)
            {
                var lowerTypeViewModelProperty = userViewModelProperty.ToLower();
                if (lowerTypeViewModelProperty.Equals(requestPropertyName))
                {
                    matchedPropertyName = userViewModelProperty;
                    break;
                }
            }

            if (string.IsNullOrEmpty(matchedPropertyName))
            {
                matchedPropertyName = "Name";
            }

            var type = typeof(UserViewModel);
            var sortProperty = type.GetProperty(matchedPropertyName);

            list = userRequestListViewModel.IsDesc ? list.OrderByDescending(x => sortProperty.GetValue(x, null)).ToList() : list.OrderBy(x => sortProperty.GetValue(x, null)).ToList();

            return new PagedList<UserViewModel>(list, userRequestListViewModel.Offset ?? CommonConstants.Config.DEFAULT_SKIP, userRequestListViewModel.Limit ?? CommonConstants.Config.DEFAULT_TAKE);
        }

        public async Task<ResponseModel> RegisterAsync(UserRegisterModel userRegisterModel)
        {
            var user = await _userRepository.FetchFirstAsync(x => x.Email == userRegisterModel.Email);
            if (user != null)
            {
                return new ResponseModel()
                {
                    StatusCode = System.Net.HttpStatusCode.NotAcceptable,
                    Message = "This email has already existed!",
                };
            }
            else
            {
                user = AutoMapper.Mapper.Map<User>(userRegisterModel);
                userRegisterModel.Password.GeneratePassword(out string saltKey, out string hashPass);
                user.Password = hashPass;
                user.PasswordSalt = saltKey;

                await _userRepository.InsertAsync(user);

                var userInRoles = new List<UserInRole>();
                foreach (var roleId in userRegisterModel.RoleIds)
                {
                    userInRoles.Add(new UserInRole()
                    {
                        UserId = user.Id,
                        RoleId = roleId
                    });
                }
                _userInRoleRepository.GetDbContext().UserInRoles.AddRange(userInRoles);
                await _userInRoleRepository.GetDbContext().SaveChangesAsync();

                user = await GetAll().FirstOrDefaultAsync(x => x.Id == user.Id);

                var jwtPayload = new JwtPayload()
                {
                    UserId = user.Id,
                    Email = user.Email,
                    Address = user.Address,
                    Name = user.Name,
                    PhoneNumber = user.PhoneNumber,
                    DateOfBirth = user.DateOfBirth,
                    Gender = user.Gender,
                    RoleIds = user.UserInRoles != null ? user.UserInRoles.Select(x => x.RoleId).ToList() : null
                };

                var token = _jwtHelper.GenerateToken(jwtPayload);

                return new ResponseModel()
                {
                    StatusCode = System.Net.HttpStatusCode.OK,
                    Data = token
                };
            }
        }

        public async Task<ResponseModel> UpdateProfileAsync(Guid id, UserUpdateProfileModel userUpdateProfileModel)
        {
            var user = await GetAll().FirstOrDefaultAsync(x => x.Id == id);
            if (user == null)
            {
                return new ResponseModel()
                {
                    StatusCode = System.Net.HttpStatusCode.NotFound,
                    Message = "User is not exist. Please try again!"
                };
            }
            else
            {
                await _userInRoleRepository.DeleteAsync(user.UserInRoles);

                var userInRoles = new List<UserInRole>();
                foreach (var roleId in userUpdateProfileModel.RoleIds)
                {
                    userInRoles.Add(new UserInRole()
                    {
                        UserId = user.Id,
                        RoleId = roleId
                    });
                }

                _userInRoleRepository.GetDbContext().UserInRoles.AddRange(userInRoles);
                await _userInRoleRepository.GetDbContext().SaveChangesAsync();

                userUpdateProfileModel.SetUserModel(user);

                return await _userRepository.UpdateAsync(user);
            }
        }

        public async Task<ResponseModel> DeleteUserAsync(Guid id)
        {
            var user = await _userRepository.GetAll().FirstOrDefaultAsync(x => x.Id == id);

            await _userInRoleRepository.DeleteAsync(user.UserInRoles);

            return await _userRepository.DeleteAsync(id);
        }

        public async Task<User> GetByIdAsync(Guid? id)
        {
            return await _userRepository.GetByIdAsync(id);
        }

        public async Task<User> GetByEmailAsync(string email)
        {
            return await _userRepository.GetAll().Include(x => x.UserInRoles).FirstOrDefaultAsync(x => x.Email == email);
        }
    }
}