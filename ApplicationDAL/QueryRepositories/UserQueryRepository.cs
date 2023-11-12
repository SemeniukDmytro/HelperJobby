using System.Diagnostics;
using ApplicationDAL.Context;
using ApplicationDomain.Absraction.IQueryRepositories;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;
using Microsoft.EntityFrameworkCore;

namespace ApplicationDAL.QueryRepositories;

public class UserQueryRepository :  IUserQueryRepository
{
    private readonly ApplicationContext _applicationContext;
    
    public UserQueryRepository(ApplicationContext applicationContext)
    {
        _applicationContext = applicationContext;
    }
    
    
    public async Task<User> GetUser(int userId, Func<IQueryable<User>, IQueryable<User>> includeQuery=null)
    {
        var query = _applicationContext.Users.AsQueryable();

        if (includeQuery != null)
        {
            query = includeQuery(query);
        }

        var userEntity = await query.FirstOrDefaultAsync(u => u.Id == userId);

        DoesUserExists(userEntity);

        return userEntity;
    }

    public async Task<bool> IsEmailAvailable(string email)
    {
        return !await _applicationContext.Users.AnyAsync(u => u.Email == email);
    }

    public async Task<User> GetUserByEmail(string email)
    {
        var user = await _applicationContext.Users.FirstOrDefaultAsync(u => u.Email == email);
        if (user == null)
        {
            throw new UserNotFoundException("User with specified email doesn't exist");
        }

        return user;
    }

    private void DoesUserExists(User user)
    {
        if (user == null)
        {
            throw new UserNotFoundException("User with specified id doesn't exist");
        }
    }
}