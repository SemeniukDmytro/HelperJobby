using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.IServices;

public interface IAuthService
{
    public string CreateToken(int userId, string userEmail);
    public Task<string> AuthUser(User loginUserDto);

    public Task<bool> DoesUserRegistered(string email);
}