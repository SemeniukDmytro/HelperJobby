using ApplicationBLL.Logic;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Abstraction.SearchIQueryRepositories;
using ApplicationDomain.Abstraction.SearchRelatedIServices;
using ApplicationDomain.Enums;
using ApplicationDomain.Exceptions;

namespace ApplicationBLL.SearchRelatedServices;

public class SearchService : ISearchService
{
    private const int MaxQueryLength = 100;
    
    private static readonly HashSet<string> StopWords = new HashSet<string>
    {
        "a", "an", "the", "in", "to", "for", "with", "on", "by", "of", "and", "or", "is", "are", "it", "that", "this", "was", "not"
    };

    private readonly ISearchQueryRepository _searchQueryRepository;
    private readonly IRankingService _rankingService;

    public SearchService(ISearchQueryRepository searchQueryRepository, IRankingService rankingService)
    {
        _searchQueryRepository = searchQueryRepository;
        _rankingService = rankingService;
    }


    public async Task<(List<int> jobIds, bool hasMoreResults)> FindJobIds(string query, string location, int numberOfResultsToSkip, 
        bool isRemote, decimal payPerHour, JobTypes jobType, string language)
    {
        if (string.IsNullOrEmpty(query) || payPerHour < 0 || jobType < 0 || (jobType & (jobType - 1)) != 0)
        {
            throw new InvalidSearchException();
        }

        var hasMoreResults = false;
        var processedQuery = ProcessQuery(query);
        
        Dictionary<int, (int Frequency, decimal TotalRank)> jobFrequencyAndRank = new();

        foreach (var word in processedQuery)
        {
            var rankedIdsMatches = (await _searchQueryRepository.GetProcessedJobWordsByWord(word,
                location,
                numberOfResultsToSkip, 
                isRemote, 
                payPerHour,
                SalaryRateHelper.GetSalaryPerDayFromPerHourRate(payPerHour),
                SalaryRateHelper.GetSalaryPerWeekFromPerHourRate(payPerHour),
                SalaryRateHelper.GetSalaryPerMonthFromPerHourRate(payPerHour),
                SalaryRateHelper.GetSalaryPerYearFromPerHourRate(payPerHour),
                jobType, 
                language)).ToList();

            if (rankedIdsMatches.Count > 10)
                hasMoreResults = true;

            var rankedIdsMatchesReturnCount = hasMoreResults ? rankedIdsMatches.Count - 1 : rankedIdsMatches.Count;

            for(int i = 0; i < rankedIdsMatchesReturnCount; i++)
            {
                jobFrequencyAndRank.TryAdd(rankedIdsMatches[i].JobId, (0, 0.0m));

                var (frequency, totalRank) = jobFrequencyAndRank[rankedIdsMatches[i].JobId];
                jobFrequencyAndRank[rankedIdsMatches[i].JobId] = (++frequency, totalRank + rankedIdsMatches[i].Rating);
            }
        }
        
        var sortedJobIds = jobFrequencyAndRank.OrderByDescending(kv => _rankingService.CombineFrequencyAndRanking(kv.Value.Frequency, kv.Value.TotalRank))
            .Select(kv => kv.Key)
            .ToList();

        return (sortedJobIds, hasMoreResults);
    }

    public async Task<(List<int> resumeIds, bool hasMoreResults)> FindResumeIds(int numberOfResultsToSkip, string query)
    {
        if (string.IsNullOrEmpty(query))
        {
            throw new InvalidSearchException();
        }

        var hasMoreResults = false;
        var processedQuery = ProcessQuery(query);
        Dictionary<int, (int Frequency, decimal TotalRank)> resumeFrequencyAndRank = new();
        foreach (var word in processedQuery)
        {
            var rankedIdsMatches = (await _searchQueryRepository
                .GetProcessedResumeWordsByWord(numberOfResultsToSkip, word)).ToList();
            
            if (rankedIdsMatches.Count > 10)
                hasMoreResults = true;

            var rankedIdsMatchesReturnCount = hasMoreResults ? rankedIdsMatches.Count - 1 : rankedIdsMatches.Count;
            
            for (int i = 0; i < rankedIdsMatchesReturnCount; i++)
            {
                resumeFrequencyAndRank.TryAdd(rankedIdsMatches[i].ResumeId, (0, 0.0m));

                var (frequency, totalRank) = resumeFrequencyAndRank[rankedIdsMatches[i].ResumeId];
                resumeFrequencyAndRank[rankedIdsMatches[i].ResumeId] = (++frequency, totalRank + rankedIdsMatches[i].Rating);
            }
        }
        var sortedResumeIds = resumeFrequencyAndRank.OrderByDescending(kv => 
                _rankingService.CombineFrequencyAndRanking(kv.Value.Frequency, kv.Value.TotalRank))
            .Select(kv => kv.Key)
            .ToList();

        return (sortedResumeIds, hasMoreResults);
    }

    private List<string> ProcessQuery(string query)
    {
        if (query.Length > MaxQueryLength)
        {
            query = query.Substring(0, MaxQueryLength);
        }
        
        var processedQuery = TextSplitter.TextNormalization(query);
        List<string> filteredQuery = new List<string>();
        if (query.Length > 5)
        {
            filteredQuery = processedQuery
                .Where(word => !StopWords.Contains(word.ToLower()))
                .ToList();
        }
        else
        {
            filteredQuery = processedQuery.ToList();
        }
        
        return filteredQuery;
    }
    
    
}