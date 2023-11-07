using ApplicationDomain.Models;

namespace ApplicationDomain.Absraction.ICommandRepositories;

public interface IUserCommandRepository
{
    public Task CreateUser(User user);
}