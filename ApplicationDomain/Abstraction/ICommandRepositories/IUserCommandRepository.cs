using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.ICommandRepositories;

public interface IUserCommandRepository
{
    public Task<User> CreateUser(User user);

    public Task<User> UpdateUser(User user);
}