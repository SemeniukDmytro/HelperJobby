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
    
    public async Task<User> GetUserById(int id)
    {
        var userEntity = _applicationContext.Users.FirstOrDefault(u => u.Id == id);

        if (userEntity == null)
        {
            throw new UserNotFoundException("User with specified id doesn't exist");
        }

        return userEntity;
    }

    public async Task<bool> IsEmailAvailable(string email)
    {
        return !await _applicationContext.Users.AnyAsync(u => u.Email == email);
    }

    public async Task<User> GetUserByEmail(string email)
    {
        var user =  _applicationContext.Users.FirstOrDefault(u => u.Email == email);
        if (user == null)
        {
            throw new UserNotFoundException("User with specified email doesn't exist");
        }

        return user;
    }
}