using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.IServices;

public interface IRecentUserSearchService
{
    public Task<RecentUserSearch> AddRecentSearch(string query, string location);
    public Task<RecentUserSearch> DeleteRecentSearch(int searchId);
}