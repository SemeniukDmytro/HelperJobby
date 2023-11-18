using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.IServices;

public interface IUserService
{
    public int GetCurrentUserId();
    
    public Task<User> CreateUser(User registerUser);

    public Task<User> UpdateUser(int id, User updatedUser);
}