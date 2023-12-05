using ApplicationDomain.IndexedModels;

namespace ApplicationDomain.Abstraction.IQueryRepositories;

public interface ISearchQueryRepository
{
    public Task<IEnumerable<ProcessedJobWord>> GetProcessedJobWordsByWord(string word);
}