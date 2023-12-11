using ApplicationDAL.Context;
using ApplicationDomain.Abstraction.SearchIQueryRepositories;
using ApplicationDomain.Enums;
using ApplicationDomain.IndexedModels;
using Microsoft.EntityFrameworkCore;

namespace ApplicationDAL.SearchQueryRepositories;

public class SearchQueryRepository : ISearchQueryRepository
{
    private const int NumberOfResultsPerPage = 10;
    
    private readonly ApplicationContext _applicationContext;

    public SearchQueryRepository(ApplicationContext applicationContext)
    {
        _applicationContext = applicationContext;
    }
    
    public async Task<IEnumerable<ProcessedJobWord>> GetProcessedJobWordsByWord(string word, string location,
        int numberOfResultsToSkip, bool isRemote, decimal pay, JobTypes jobType, string? language )
    {
        
        var query = _applicationContext.ProcessedJobsWords.Where(p => p.JobIndexedWord.Word == word);

        if (isRemote)
        {
            query = query.Where(p => p.Job.Location.ToLower().Contains("remote"));
        }

        if (pay > 0)
        {
            query = query.Where(p => p.Job.Salary >= pay);
        }

        if ((int)jobType != 0)
        {
            query = query.Where(p => (p.Job.JobTypes & jobType) != 0);
        }

        if (!string.IsNullOrEmpty(location))
        {
            query = query.Where(p => p.Job.Location.Contains(location));
        }

        if (!string.IsNullOrEmpty(language))
        {
            query = query.Where(p => p.Job.Language.ToLower() == language.ToLower());
        }
        
        var processedJobWords = await query
            .OrderByDescending(p => p.Rating)
            .Skip(numberOfResultsToSkip)
            .Take(NumberOfResultsPerPage)
            .ToListAsync();
        
        return processedJobWords;
    }

    public async Task<IEnumerable<ProcessedResumeWord>> GetProcessedResumeWordsByWord(int numberOfResultsToSkip, string word)
    {
        
        var processedJobWords = await _applicationContext.ProcessedResumesWords
            .Where(p => p.ResumeIndexedWord.Word == word)
            .OrderByDescending(p => p.Rating )
            .Skip(numberOfResultsToSkip)
            .Take(NumberOfResultsPerPage)
            .ToListAsync();
        
        return processedJobWords;
    }
}