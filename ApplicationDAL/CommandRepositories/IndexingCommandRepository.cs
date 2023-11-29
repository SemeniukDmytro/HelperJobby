using ApplicationDAL.Context;
using ApplicationDomain.Abstraction.ICommandRepositories;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.IndexedModels;
using Microsoft.EntityFrameworkCore;

namespace ApplicationDAL.CommandRepositories;

public class IndexingCommandRepository : IIndexingCommandRepository
{
    private readonly ApplicationContext _applicationContext;
    private readonly IIndexingQueryRepository _indexingQueryRepository; 

    public IndexingCommandRepository(ApplicationContext applicationContext, IIndexingQueryRepository indexingQueryRepository)
    {
        _applicationContext = applicationContext;
        _indexingQueryRepository = indexingQueryRepository;
    }

    public async Task SaveIndexedJobWords(List<JobIndexedWord> indexedJobWords)
    {
        _applicationContext.IndexedJobWords.AddRange(indexedJobWords);
        await _applicationContext.SaveChangesAsync();
    }

    public async Task UpdateIndexedWordJobCount(JobIndexedWord indexedWord)
    {
       _applicationContext.Entry(indexedWord).Property(i => i.JobCount).IsModified = true;
    }

    public async Task SaveProcessedJobWords(List<ProcessedJobWord> processedJobWords)
    {
        _applicationContext.ProcessedJobsWords.AddRange(processedJobWords);
        await _applicationContext.SaveChangesAsync();
    }
    
    
    public async Task RemoveProcessedJobWords(int jobId)
    {
        var wordsToRemove = (await _indexingQueryRepository.GetProcessedJobWordsByJobId(jobId)).ToList();
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