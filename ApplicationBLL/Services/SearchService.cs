using ApplicationBLL.Logic;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.IndexedModels;
using ApplicationDomain.Models;

namespace ApplicationBLL.Services;

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

    public async Task<IEnumerable<Job>> FindJobs(string query)
    {
        if (string.IsNullOrEmpty(query))
        {
            return null;
        }

        var jobsToLoad = await GetJobIdsToLoad(query);
        

        return null;
    }

    private async Task<List<int>> GetJobIdsToLoad(string query)
    {
        var processedQuery = ProcessQuery(query);
        
        Dictionary<int, (int Frequency, decimal TotalRank)> jobFrequencyAndRank = new();

        foreach (var word in processedQuery)
        {
            var rankedIdsMatches = (await _searchQueryRepository.GetProcessedJobWordsByWord(word)).ToList();

            foreach (var match in rankedIdsMatches)
            {
                if (!jobFrequencyAndRank.ContainsKey(match.JobId))
                {
                    jobFrequencyAndRank[match.JobId] = (0, 0.0m);
                }

                var (frequency, totalRank) = jobFrequencyAndRank[match.JobId];
                jobFrequencyAndRank[match.JobId] = (++frequency, totalRank + match.Rating);
            }
        }
        
        var sortedJobIds = jobFrequencyAndRank.OrderByDescending(kv => _rankingService.CombineFrequencyAndRanking(kv.Value.Frequency, kv.Value.TotalRank))
            .Select(kv => kv.Key)
            .ToList();

        return sortedJobIds;
    }
    
    

    public Task<IEnumerable<Resume>> FindResumes(string query)
    {
        throw new NotImplementedException();
    }
    
    public List<string> ProcessQuery(string query)
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