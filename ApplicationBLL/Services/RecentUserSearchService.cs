using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Models;

namespace ApplicationBLL.Services;

public class RecentUserSearchService : IRecentUserSearchService
{
    public Task<RecentUserSearch> AddRecentSearch(string query, string location)
    {
        throw new NotImplementedException();
    }

    public Task<RecentUserSearch> DeleteRecentSearch(int searchId)
    {
        throw new NotImplementedException();
    }
}