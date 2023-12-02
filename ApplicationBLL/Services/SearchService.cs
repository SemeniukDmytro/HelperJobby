using ApplicationBLL.Logic;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Models;

namespace ApplicationBLL.Services;

public class SearchService : ISearchService
{
    private const int MaxQueryLength = 100;
    private static readonly HashSet<string> StopWords = new HashSet<string>
    {
        "a", "an", "the", "in", "to", "for", "with", "on", "by", "of", "and", "or", "is", "are", "it", "that", "this", "was", "not"
    };
    
    public async Task<IEnumerable<Job>> FindJobs(string query)
    {
        if (string.IsNullOrEmpty(query))
        {
            return null;
        }

        var processedQuery = ProcessQuery(query);
        List<Job> results = new List<Job>();
        foreach (var word in processedQuery)
        {
            
        }

        return null;
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
        List<string> filteredQuery = processedQuery
            .Where(word => !StopWords.Contains(word.ToLower()))
            .ToList();
        return filteredQuery;
    }
}