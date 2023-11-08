using ApplicationDAL.Context;
using ApplicationDomain.Absraction.ICommandRepositories;
using ApplicationDomain.Models;

namespace ApplicationDAL.CommandRepositories;

public class UserCommandRepository : IUserCommandRepository
{
    private readonly ApplicationContext _applicationContext;

    public UserCommandRepository(ApplicationContext applicationContext)
    {
        _applicationContext = applicationContext;
    }

    public async Task CreateUser(User user)
    {
        _applicationContext.Users.Add(user);
        await _applicationContext.SaveChangesAsync();
    }

    public async Task<User> UpdateUser(User user)
    {
        await _applicationContext.SaveChangesAsync();
        return user;
    }
}