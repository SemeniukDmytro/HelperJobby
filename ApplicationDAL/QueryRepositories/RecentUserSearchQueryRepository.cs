using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Models;

namespace ApplicationDAL.QueryRepositories;

public class RecentUserSearchQueryRepository : IRecentUserSearchQueryRepository
{
    public Task<RecentUserSearch> GetRecentUserSearchById(int searchId)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<RecentUserSearch>> GetRecentUserSearches()
    {
        throw new NotImplementedException();
    }
}