using ApplicationDAL.Context;
using ApplicationDomain.Abstraction.SearchIQueryRepositories;
using ApplicationDomain.IndexedModels;
using Microsoft.EntityFrameworkCore;

namespace ApplicationDAL.SearchQueryRepositories;

public class JobIndexingQueryRepository : IJobIndexingQueryRepository
{
    private readonly ApplicationContext _applicationContext;

    public JobIndexingQueryRepository(ApplicationContext applicationContext)
    {
        _applicationContext = applicationContext;
    }
    
    public async Task<IEnumerable<JobIndexedWord>> GetJobIndexedWords(List<string> words)
    {
        var results = await _applicationContext.IndexedJobWords
            .Where(w => words.Contains(w.Word))
            .ToListAsync();
        return results;
    }

    public async Task<IEnumerable<ProcessedJobWord>> GetProcessedJobWordsByJobId(int jobId)
    {
        var receivedWords = await _applicationContext.ProcessedJobsWords.Include(w => w.JobIndexedWord)
            .Where(w => w.JobId == jobId).ToListAsync();
        return receivedWords;
    }

}