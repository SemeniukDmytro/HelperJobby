using ApplicationDomain.IndexedModels;

namespace ApplicationDomain.Abstraction.IQueryRepositories;

public interface IJobIndexingQueryRepository
{
    public Task<IEnumerable<JobIndexedWord>> GetJobIndexedWords(List<string> words);
    public Task<IEnumerable<ProcessedJobWord>> GetProcessedJobWordsByJobId(int jobId);
}