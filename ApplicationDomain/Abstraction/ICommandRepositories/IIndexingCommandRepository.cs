using ApplicationDomain.IndexedModels;

namespace ApplicationDomain.Abstraction.ICommandRepositories;

public interface IIndexingCommandRepository
{
    public Task SaveIndexedJobWords(List<JobIndexedWord> indexedJobWords);
    public Task UpdateIndexedWordJobCount(JobIndexedWord indexedWord);
    public Task SaveProcessedJobWords(List<ProcessedJobWord> processedJobWords);
    public Task RemoveProcessedJobWords(int jobId);

}