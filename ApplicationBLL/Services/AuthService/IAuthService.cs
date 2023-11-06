using ApplicationCommon.DTOs.User;

namespace ApplicationBLL.Services.AuthService;

public interface IAuthService
{
    public string CreateToken(int userId, string userEmail);
    public Task<AuthUserDTO> AuthUser(LoginUserDTO loginUserDto);
}