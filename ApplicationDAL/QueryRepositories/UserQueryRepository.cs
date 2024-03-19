using ApplicationDAL.Context;
using ApplicationDAL.Projections.UserProjections;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.AuthRelatedModels;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;
using Microsoft.EntityFrameworkCore;

namespace ApplicationDAL.QueryRepositories;

public class UserQueryRepository : IUserQueryRepository
{
    private readonly ApplicationContext _applicationContext;

    public UserQueryRepository(ApplicationContext applicationContext)
    {
        _applicationContext = applicationContext;
    }


    public async Task<User> GetUserById(int userId)
    {
        return await GetUser(userId);
    }

    public async Task<User> GetUserWithEmployer(int userId)
    {
        return await GetUser(userId, q => q.Include(u => u.Employer));
    }

    public async Task<User> GetUserWithJobSeeker(int userId)
    {
        return await GetUser(userId, q => q.Include(u => u.JobSeeker));
    }

    public async Task<bool> IsEmailAvailable(string email)
    {
        return !await _applicationContext.Users.AnyAsync(u => u.Email == email);
    }

    public async Task<User> GetUserByEmail(string email)
    {
        var user = await _applicationContext.Users.FirstOrDefaultAsync(u => u.Email == email);
        if (user == null) throw new UserNotFoundException("User with specified email doesn't exist");

        return user;
    }

    public async Task<User> GetUserByEmailWithRefreshToken(string email)
    {
        var userEntity = await _applicationContext.Users.Where(u => u.Email == email)
            .Select(UserProjections.UserWithRefreshTokenAndAccountIds()).FirstOrDefaultAsync();
        if (userEntity == null) throw new UserNotFoundException("User with provided email is not found");
        return userEntity;
    }

    public async Task<User> GetUserByIdWithRefreshToken(int userId)
    {
        var userEntity = await _applicationContext.Users.Where(u => u.Id == userId)
            .Select(UserProjections.UserWithRefreshTokenAndAccountIds()).FirstOrDefaultAsync();
        if (userEntity == null) throw new UserNotFoundException("User with provided email is not found");
        return userEntity;
    }

    public async Task<RefreshToken> GetRefreshTokenByUserId(int userId)
    {
        var token = await _applicationContext.RefreshTokens.FirstOrDefaultAsync(t => t.UserId == userId);
        if (token == null) throw new UnauthorizedException();

        return token;
    }

    private async Task<User> GetUser(int userId, Func<IQueryable<User>, IQueryable<User>> includeQuery = null)
    {
        var query = _applicationContext.Users.AsQueryable();

        if (includeQuery != null) query = includeQuery(query);

        var userEntity = await query.FirstOrDefaultAsync(u => u.Id == userId);

        if (userEntity == null) throw new UserNotFoundException("User with specified id doesn't exist");

        return userEntity;
    }
}