using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Abstraction.SearchRelatedIServices;
using ApplicationDomain.Models;

namespace ApplicationBLL.Services;

public class RecommendationService : IRecommendationService
{
    private readonly IEmployerService _employerService;
    private readonly IJobQueryRepository _jobQueryRepository;
    private readonly IRecentUserSearchQueryRepository _recentUserSearchQueryRepository;
    private readonly ISearchService _searchService;
    private readonly IUserService _userService;

    public RecommendationService(IUserService userService,
        IRecentUserSearchQueryRepository recentUserSearchQueryRepository, ISearchService searchService,
        IJobQueryRepository jobQueryRepository, IEmployerService employerService)
    {
        _userService = userService;
        _recentUserSearchQueryRepository = recentUserSearchQueryRepository;
        _searchService = searchService;
        _jobQueryRepository = jobQueryRepository;
        _employerService = employerService;
    }

    public async Task<IEnumerable<Job>> GetJobsBasedOnPreviousUserSearches()
    {
        int? currentEmployerId = null;
        int? currentUserId = null;
        try
        {
            currentEmployerId = _employerService.GetCurrentEmployerId();
            currentUserId = _userService.GetCurrentUserId();
        }
        catch (Exception e)
        {
        }

        var jobIds = new List<int>();
        if (currentUserId != null) jobIds = await GetRecommendedJobIds();

        if (jobIds.Count == 0) return await _jobQueryRepository.GetRandomJobs(currentEmployerId);

        return await _jobQueryRepository.GetJobsByJobIds(jobIds, currentEmployerId);
    }

    private async Task<List<int>> GetRecommendedJobIds()
    {
        var currentUserId = _userService.GetCurrentUserId();
        var recentSearches = (await _recentUserSearchQueryRepository.GetRecentUserSearches(currentUserId)).ToArray();
        if (recentSearches.Length == 0) return new List<int>();
        var query = "";
        var location = "";
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
        return jobIds.jobIds;
    }
}