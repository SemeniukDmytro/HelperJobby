using ApplicationDomain.IndexedModels;

namespace ApplicationDomain.Abstraction.IQueryRepositories;

public interface IIndexingQueryRepository
{
    public Task<IEnumerable<JobIndexedWord>> GetIndexedJobWords(List<string> words);

    public Task<IEnumerable<ProcessedJobWord>> GetProcessedJobWordsByJobId(int jobId);
}