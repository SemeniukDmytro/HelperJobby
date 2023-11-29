using ApplicationDomain.IndexedModels;

namespace ApplicationDomain.Abstraction.ICommandRepositories;

public interface IIndexingCommandRepository
{
    public Task SaveIndexedJobWords(List<IndexedJobWord> indexedJobWords);

    public Task SaveProcessedJobWords(List<ProcessedJobWord> processedJobWords);
}