using ApplicationDAL.Context;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;
using Microsoft.EntityFrameworkCore;

namespace ApplicationDAL.QueryRepositories;

public class CustomQueryIncluder
{
    private  ApplicationContext _applicationContext;

    public CustomQueryIncluder(ApplicationContext applicationContext)
    {
         _applicationContext = applicationContext;
    }


    internal  async Task<User> GetUser(int userId, Func<IQueryable<User>, IQueryable<User>> includeQuery=null)
    {
        var query = _applicationContext.Users.AsQueryable();

        if (includeQuery != null)
        {
            query = includeQuery(query);
        }

        var userEntity = await query.FirstOrDefaultAsync(u => u.Id == userId);

        if (userEntity == null)
        {
            throw new UserNotFoundException("User with specified id doesn't exist");
        }

        return userEntity;
    }
    
}