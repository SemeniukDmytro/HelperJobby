using ApplicationDAL.Context;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;
using Microsoft.EntityFrameworkCore;

namespace ApplicationDAL.QueryRepositories;

public class RecentUserSearchQueryRepository : IRecentUserSearchQueryRepository
{
    private readonly ApplicationContext _applicationContext;
    private readonly IUserService _userService;

    public RecentUserSearchQueryRepository(ApplicationContext applicationContext, IUserService userService)
    {
        _applicationContext = applicationContext;
        _userService = userService;
    }

    public async Task<RecentUserSearch> GetRecentUserSearchById(int searchId)
    {
        var recentSearchEntity = await _applicationContext.RecentUserSearches.FirstOrDefaultAsync(s => s.Id == searchId);
        if (recentSearchEntity == null)
        {
            throw new RecentSearchNotFoundException();
        }

        return recentSearchEntity;
    }

    public async Task<IEnumerable<RecentUserSearch>> GetRecentUserSearches(int userId)
    {
        var results = await _applicationContext.RecentUserSearches.Where(rs => rs.UserId == userId).ToListAsync();
        return results;
    }
}