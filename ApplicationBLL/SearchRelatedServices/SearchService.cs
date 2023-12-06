using ApplicationBLL.Logic;
using ApplicationDomain.Abstraction.SearchIQueryRepositories;
using ApplicationDomain.Abstraction.SearchRelatedIServices;

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

    public async Task<List<int>> FindJobsIds(int numberOfResultsToSkip, string query)
    {
        if (string.IsNullOrEmpty(query))
        {
            return null;
        }

        var processedQuery = ProcessQuery(query);
        
        Dictionary<int, (int Frequency, decimal TotalRank)> jobFrequencyAndRank = new();

        foreach (var word in processedQuery)
        {
            var rankedIdsMatches = (await _searchQueryRepository.GetProcessedJobWordsByWord(numberOfResultsToSkip, word)).ToList();

            foreach (var match in rankedIdsMatches)
            {
                jobFrequencyAndRank.TryAdd(match.JobId, (0, 0.0m));

                var (frequency, totalRank) = jobFrequencyAndRank[match.JobId];
                jobFrequencyAndRank[match.JobId] = (++frequency, totalRank + match.Rating);
            }
        }
        
        var sortedJobIds = jobFrequencyAndRank.OrderByDescending(kv => _rankingService.CombineFrequencyAndRanking(kv.Value.Frequency, kv.Value.TotalRank))
            .Select(kv => kv.Key)
            .ToList();

        return sortedJobIds;
    }
    

    public async Task<List<int>> FindResumeIds(int numberOfResultsToSkip, string query)
    {
        if (string.IsNullOrEmpty(query))
        {
            return null;
        }

        var processedQuery = ProcessQuery(query);
        Dictionary<int, (int Frequency, decimal TotalRank)> resumeFrequencyAndRank = new();
        foreach (var word in processedQuery)
        {
            var rankedIdsMatches = (await _searchQueryRepository.GetProcessedResumeWordsByWord(numberOfResultsToSkip, word)).ToList();

            foreach (var match in rankedIdsMatches)
            {
                resumeFrequencyAndRank.TryAdd(match.ResumeId, (0, 0.0m));

                var (frequency, totalRank) = resumeFrequencyAndRank[match.ResumeId];
                resumeFrequencyAndRank[match.ResumeId] = (++frequency, totalRank + match.Rating);
            }
        }
        var sortedResumeIds = resumeFrequencyAndRank.OrderByDescending(kv => 
                _rankingService.CombineFrequencyAndRanking(kv.Value.Frequency, kv.Value.TotalRank))
            .Select(kv => kv.Key)
            .ToList();

        return sortedResumeIds;
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