using ApplicationDAL.Context;
using ApplicationDomain.Abstraction.ICommandRepositories;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Models;

namespace ApplicationDAL.SearchCommandRepositories;

public class RecentUserSearchCommandRepository : IRecentUserSearchCommandRepository
{
    private readonly ApplicationContext _applicationContext;

    public RecentUserSearchCommandRepository(ApplicationContext applicationContext)
    {
        _applicationContext = applicationContext;
    }

    public async Task CreateRecentUserSearch(RecentUserSearch userSearch)
    {
        _applicationContext.RecentUserSearches.Add(userSearch);
        await _applicationContext.SaveChangesAsync();
    }

    public async Task DeleteRecentUserSearch(RecentUserSearch userSearch)
    {
        _applicationContext.RecentUserSearches.Remove(userSearch);
        await _applicationContext.SaveChangesAsync();
    }
}