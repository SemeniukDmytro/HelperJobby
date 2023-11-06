using ApplicationCommon.DTOs.User;

namespace ApplicationBLL.Services.UserService;

public interface IUserService
{
    public Task CreateUser(RegisterUserDTO registerUserDTO);
}