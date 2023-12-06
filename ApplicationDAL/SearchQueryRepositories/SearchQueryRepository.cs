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

    public async Task<IEnumerable<ProcessedJobWord>> GetProcessedJobWordsByWord(int numberOfResultsToSkip, string word)
    {
        
        var processedJobWords = await _applicationContext.ProcessedJobsWords
            .Where(p => p.JobIndexedWord.Word == word)
            .OrderByDescending(p => p.Rating )
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

    public Task<IEnumerable<ProcessedJobWord>> GetFilteredProcessedJobWordsByWord(int numberOfResultsToSkip, string word, bool isRemote, decimal pay, JobTypes jobType, string location,
        string language)
    {
        throw new NotImplementedException();
    }
}