using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.ICommandRepositories;

public interface IRecentUserSearchCommandRepository
{
    public Task CreateRecentUserSearch(RecentUserSearch userSearch);
    public Task DeleteRecentUserSearch(RecentUserSearch userSearch);
}