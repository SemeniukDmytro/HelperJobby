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
    
    public async Task<User> GetUserById(int id)
    {
        var userEntity = await _applicationContext.Users.Include(u => u.EmployerAccount) 
            .Include(u => u.JobSeekerAccount).FirstOrDefaultAsync(u => u.Id == id);
        if (userEntity == null)
        {
            throw new UserNotFoundException("User with specified id doesn't exist");
        }

        return userEntity;
    }

    public async Task<User> GetUserWithEmployerAccount(int userId)
    {
        var userEntity = await _applicationContext.Users.Include(u => u.EmployerAccount)
            .FirstOrDefaultAsync(u => u.Id == userId);

        if (userEntity == null)
        {
            throw new UserNotFoundException("User with specified id doesn't exist");
        }

        return userEntity;
    }

    public async Task<User> GetUserWithJobSeekerAccount(int userId)
    {
        var userEntity = await _applicationContext.Users.Include(u => u.JobSeekerAccount)
            .FirstOrDefaultAsync(u => u.Id == userId);

        if (userEntity == null)
        {
            throw new UserNotFoundException("User with specified id doesn't exist");
        }

        return userEntity;
    }

    public async Task<User> GetUserByIdPlain(int id)
    {
        var userEntity = await _applicationContext.Users.FirstOrDefaultAsync(u => u.Id == id);
        
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
        var user = await _applicationContext.Users.FirstOrDefaultAsync(u => u.Email == email);
        if (user == null)
        {
            throw new UserNotFoundException("User with specified email doesn't exist");
        }

        return user;
    }
}