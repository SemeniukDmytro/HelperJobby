using ApplicationBLL.Exceptions;
using ApplicationBLL.Services.Absract;
using ApplicationCommon.DTOs.User;
using ApplicationCommon.Interfaces;
using ApplicationDAL.Context;
using AutoMapper;

namespace ApplicationBLL.QueryRepositories;

public class UserQueryRepository : BaseService
{
    private IUserIdGetter _userIdGetter;

    public UserQueryRepository(IMapper mapper, ApplicationContext applicationContext, IUserIdGetter userIdGetter) : base(mapper, applicationContext)
    {
        _userIdGetter = userIdGetter;
    }

    public async Task<UserDTO> GetUserById(int id)
    {
        var userEntity = _applicationContext.Users.FirstOrDefault(u => u.Id == id);

        if (userEntity == null)
        {
            throw new UserNotFoundException("User with specified id doesn't exist");
        }

        return _mapper.Map<UserDTO>(userEntity);

    }
    
    public int GetCurrentUserId()
    {
        return _userIdGetter.CurrentId;
    }
}