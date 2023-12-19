using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.IQueryRepositories;

public interface IUserQueryRepository
{
    public Task<User> GetUserByIdPlain(int userId);

    public Task<User> GetUserByIdWithRefreshToken(int userId);
    public Task<User> GetUserWithEmployerAccount(int userId);
    public Task<User> GetUserWithJobSeekerAccount(int userId);
    public Task<User> GetUserById(int userId);
    public Task<bool> IsEmailAvailable(string email);
    public Task<User> GetUserByEmail(string email);
}