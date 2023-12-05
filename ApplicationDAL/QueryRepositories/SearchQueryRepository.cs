using ApplicationDAL.Context;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.IndexedModels;
using Microsoft.EntityFrameworkCore;

namespace ApplicationDAL.QueryRepositories;

public class SearchQueryRepository : ISearchQueryRepository
{
    private readonly ApplicationContext _applicationContext;

    public SearchQueryRepository(ApplicationContext applicationContext)
    {
        _applicationContext = applicationContext;
    }

    public async Task<IEnumerable<ProcessedJobWord>> GetProcessedJobWordsByWord(string word)
    {
        
        var processedJobWords = await _applicationContext.ProcessedJobsWords
            .Where(p => p.JobIndexedWord.Word == word)
            .OrderByDescending(p => p.Rating )
            .Skip(0)
            .Take(10)
            .ToListAsync();
        
        return processedJobWords;
    }
    
    public async Task<IEnumerable<ProcessedResumeWord>> GetProcessedResumeWordsByWord(string word)
    {
        
        var processedJobWords = await _applicationContext.ProcessedResumesWords
            .Where(p => p.ResumeIndexedWord.Word == word)
            .OrderByDescending(p => p.Rating )
            .Skip(0)
            .Take(10)
            .ToListAsync();
        
        return processedJobWords;
    }
}