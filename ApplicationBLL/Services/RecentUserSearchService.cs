using ApplicationDomain.Abstraction.ICommandRepositories;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;

namespace ApplicationBLL.Services;

public class RecentUserSearchService : IRecentUserSearchService
{
    private readonly IUserService _userService;
    private readonly IRecentUserSearchCommandRepository _recentUserSearchCommandRepository;
    private readonly IRecentUserSearchQueryRepository _recentUserSearchQueryRepository;

    public RecentUserSearchService(IUserService userService, IRecentUserSearchCommandRepository recentUserSearchCommandRepository, IRecentUserSearchQueryRepository recentUserSearchQueryRepository)
    {
        _userService = userService;
        _recentUserSearchCommandRepository = recentUserSearchCommandRepository;
        _recentUserSearchQueryRepository = recentUserSearchQueryRepository;
    }

    public async Task AddRecentSearch(string query, string location, int userId)
    {
        if (string.IsNullOrEmpty(query))
        {
            throw new InvalidSearchException();
        }

        var recentUserSearch = new RecentUserSearch()
        {
            Location = location,
            Query = query,
            UserId = userId
        };
        var recentSearches = (await _recentUserSearchQueryRepository.GetRecentUserSearches(userId)).ToArray();
        if (recentSearches.Length >= 10)
        {
            await _recentUserSearchCommandRepository.DeleteRecentUserSearch(recentSearches.First());
        }
        await _recentUserSearchCommandRepository.CreateRecentUserSearch(recentUserSearch);
    }

    public async Task<RecentUserSearch> DeleteRecentSearch(int searchId)
    {
        var searchEntity = await _recentUserSearchQueryRepository.GetRecentUserSearchById(searchId);
        var currentUserId = _userService.GetCurrentUserId();
        if (searchEntity.UserId != currentUserId)
        {
            throw new ForbiddenException();
        }

        return searchEntity;
    }
}