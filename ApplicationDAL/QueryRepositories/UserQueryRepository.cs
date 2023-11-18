using System.Diagnostics;
using ApplicationDAL.Context;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;
using Microsoft.EntityFrameworkCore;

namespace ApplicationDAL.QueryRepositories;

public class UserQueryRepository :  IUserQueryRepository
{
    private readonly ApplicationContext _applicationContext;
    private readonly CustomQueryIncluder _customQueryIncluder;
    
    public UserQueryRepository(ApplicationContext applicationContext, CustomQueryIncluder customQueryIncluder)
    {
        _applicationContext = applicationContext;
        _customQueryIncluder = customQueryIncluder;
    }
    

    public async Task<User> GetUserByIdPlain(int userId)
    {
        return await _customQueryIncluder.GetUser(userId);
    }

    public async Task<User> GetUserWithEmployerAccount(int userId)
    {
        return await _customQueryIncluder.GetUser(userId, q => q.Include(u => u.EmployerAccount));
    }

    public async Task<User> GetUserWithJobSeekerAccount(int userId)
    {
        return await _customQueryIncluder.GetUser(userId, q => q.Include(u => u.JobSeekerAccount));
    }

    public async Task<User> GetUserById(int userId)
    {
        return await  _customQueryIncluder.GetUser(userId, q => q.Include(u => u.EmployerAccount)
            .Include(u => u.JobSeekerAccount));
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