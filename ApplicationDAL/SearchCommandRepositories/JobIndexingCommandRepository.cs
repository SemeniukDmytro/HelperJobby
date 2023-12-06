using ApplicationDAL.Context;
using ApplicationDomain.Abstraction.SearchICommandRepositories;
using ApplicationDomain.Abstraction.SearchIQueryRepositories;
using ApplicationDomain.IndexedModels;

namespace ApplicationDAL.SearchCommandRepositories;

public class JobIndexingCommandRepository : IJobIndexingCommandRepository
{
    private readonly ApplicationContext _applicationContext;
    private readonly IJobIndexingQueryRepository _jobIndexingQueryRepository; 

    public JobIndexingCommandRepository(ApplicationContext applicationContext, IJobIndexingQueryRepository jobIndexingQueryRepository)
    {
        _applicationContext = applicationContext;
        _jobIndexingQueryRepository = jobIndexingQueryRepository;
    }

    public async Task SaveIndexedJobWords(List<JobIndexedWord> indexedJobWords)
    {
        _applicationContext.IndexedJobWords.AddRange(indexedJobWords);
        await _applicationContext.SaveChangesAsync();
    }


    public async Task SaveProcessedJobWords(List<ProcessedJobWord> processedJobWords)
    {
        _applicationContext.ProcessedJobsWords.AddRange(processedJobWords);
        await _applicationContext.SaveChangesAsync();
    }
    public async Task UpdateIndexedWordJobCount(JobIndexedWord indexedWord)
    {
       _applicationContext.Entry(indexedWord).Property(i => i.JobCount).IsModified = true;
    }
    
    
    public async Task RemoveProcessedJobWords(int jobId)
    {
        var wordsToRemove = (await _jobIndexingQueryRepository.GetProcessedJobWordsByJobId(jobId)).ToList();
        if (wordsToRemove.Count == 0)
        {
            return;
        }
        foreach (var processedJobWord in wordsToRemove)
        {
            if (--processedJobWord.JobIndexedWord.JobCount <= 0)
            {
                _applicationContext.IndexedJobWords.Remove(processedJobWord.JobIndexedWord);
            }
            else
            {
                await UpdateIndexedWordJobCount(processedJobWord.JobIndexedWord);
            }
        }
        _applicationContext.ProcessedJobsWords.RemoveRange(wordsToRemove);
        await _applicationContext.SaveChangesAsync();
    }
}