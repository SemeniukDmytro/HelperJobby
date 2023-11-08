using ApplicationDomain.Models;

namespace ApplicationDomain.Absraction.IServices;

public interface IUserService
{
    public int GetCurrentUserId();
    
    public Task<User> CreateUser(User registerUser);
}