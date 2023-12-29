using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.IServices;

public interface IRecentUserSearchService
{
    public Task AddRecentSearch(string query, string location, int userId);
    public Task<RecentUserSearch> DeleteRecentSearch(int searchId);
}