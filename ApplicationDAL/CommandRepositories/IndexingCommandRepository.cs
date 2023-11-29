using ApplicationDAL.Context;
using ApplicationDomain.Abstraction.ICommandRepositories;
using ApplicationDomain.IndexedModels;

namespace ApplicationDAL.CommandRepositories;

public class IndexingCommandRepository : IIndexingCommandRepository
{
    private readonly SearchEngineContext _searchEngineContext;

    public IndexingCommandRepository(SearchEngineContext searchEngineContext)
    {
        _searchEngineContext = searchEngineContext;
    }

    public async Task SaveIndexedJobWords(List<IndexedJobWord> indexedJobWords)
    {
        _searchEngineContext.IndexedJobWords.AddRange(indexedJobWords);
        await _searchEngineContext.SaveChangesAsync();
    }

    public async Task SaveProcessedJobWords(List<ProcessedJobWord> processedJobWords)
    {
        _searchEngineContext.ProcessedJobsWords.AddRange(processedJobWords);
        await _searchEngineContext.SaveChangesAsync();
    }
}