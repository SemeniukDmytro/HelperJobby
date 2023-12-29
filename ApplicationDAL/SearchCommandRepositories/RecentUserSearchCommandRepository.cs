using ApplicationDomain.Abstraction.ICommandRepositories;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Models;

namespace ApplicationDAL.SearchCommandRepositories;

public class RecentUserSearchCommandRepository : IRecentUserSearchCommandRepository
{
    public Task<RecentUserSearch> CreateRecentUserSearch(RecentUserSearch userSearch)
    {
        throw new NotImplementedException();
    }

    public Task DeleteRecentUserSearch(RecentUserSearch userSearch)
    {
        throw new NotImplementedException();
    }
}