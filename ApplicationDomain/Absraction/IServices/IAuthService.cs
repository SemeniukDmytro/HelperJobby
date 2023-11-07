using ApplicationDomain.Models;

namespace ApplicationDomain.Absraction.IServices;

public interface IAuthService
{
    public string CreateToken(int userId, string userEmail);
    public Task<string> AuthUser(User loginUserDto);
}