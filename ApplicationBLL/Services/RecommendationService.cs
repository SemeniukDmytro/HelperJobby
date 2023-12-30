using System.Text;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Abstraction.SearchRelatedIServices;
using ApplicationDomain.Models;

namespace ApplicationBLL.Services;

public class RecommendationService : IRecommendationService
{
    private readonly IUserService _userService;
    private readonly IRecentUserSearchQueryRepository _recentUserSearchQueryRepository;
    private readonly ISearchService _searchService;

    public RecommendationService(IUserService userService, IRecentUserSearchQueryRepository recentUserSearchQueryRepository, ISearchService searchService)
    {
        _userService = userService;
        _recentUserSearchQueryRepository = recentUserSearchQueryRepository;
        _searchService = searchService;
    }

    public async Task<IEnumerable<int>> GetJobsBasedOnPreviousUserSearches()
    {
        var currentUserId = _userService.GetCurrentUserId();
        var recentSearches = (await _recentUserSearchQueryRepository.GetRecentUserSearches(currentUserId)).ToArray();
        string query = "";
        string location = "";
        if (recentSearches.Length > 3)
        {
            query = $"{recentSearches[0].Query} {recentSearches[1].Query} {recentSearches[2].Query}";
            location = $"{recentSearches[0].Location} {recentSearches[1].Location} {recentSearches[2].Location}";
        }
        else
        {
            query = string.Join(" ", recentSearches.Select(search => search.Query));
            location = string.Join(" ", recentSearches.Select(search => search.Location));
        }

        var jobIds = await _searchService.FindJobIds(query, location, 0, false, 0, 0, "");
        return jobIds;
    }
}