using ApplicationDomain.IndexedModels;

namespace ApplicationDomain.Abstraction.SearchICommandRepositories;

public interface IJobIndexingCommandRepository
{
    public Task SaveIndexedJobWords(List<JobIndexedWord> indexedJobWords);
    public Task UpdateIndexedWordJobCount(JobIndexedWord indexedWord);
    public Task SaveProcessedJobWords(List<ProcessedJobWord> processedJobWords);
    public Task RemoveProcessedJobWords(int jobId);

}