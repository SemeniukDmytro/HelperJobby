using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.IQueryRepositories;

public interface IRecentUserSearchQueryRepository
{
    public Task<RecentUserSearch> GetRecentUserSearchById(int searchId);
    public Task<IEnumerable<RecentUserSearch>> GetRecentUserSearches();
}