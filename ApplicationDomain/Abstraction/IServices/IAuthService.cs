using System.Security.Claims;
using ApplicationDomain.AuthRelatedModels;
using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.IServices;

public interface IAuthService
{
    public string CreateToken(int userId, string userEmail);

    public RefreshToken GenerateRefreshToken();
    public Task<string> AuthUser(User loginUserDto);

    public Task<bool> DoesUserRegistered(string email);

    public Task<User> RefreshToken(string accessToken, string refreshToken);
}