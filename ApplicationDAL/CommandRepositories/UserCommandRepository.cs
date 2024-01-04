using ApplicationDAL.Context;
using ApplicationDomain.Abstraction.ICommandRepositories;
using ApplicationDomain.AuthRelatedModels;
using ApplicationDomain.Models;

namespace ApplicationDAL.CommandRepositories;

public class UserCommandRepository : IUserCommandRepository
{
    private readonly ApplicationContext _applicationContext;

    public UserCommandRepository(ApplicationContext applicationContext)
    {
        _applicationContext = applicationContext;
    }

    public async Task<User> CreateUser(User user)
    {
        _applicationContext.Users.Add(user);
        await _applicationContext.SaveChangesAsync();
        return user;
    }

    public async Task<User> UpdateUser(User user)
    {
        _applicationContext.Attach(user);
        _applicationContext.Users.Update(user);
        await _applicationContext.SaveChangesAsync();
        return user;
    }

    public async Task DeleteUserRefreshToken(RefreshToken refreshToken)
    {
        _applicationContext.RefreshTokens.Remove(refreshToken);
        await _applicationContext.SaveChangesAsync();
    }
}