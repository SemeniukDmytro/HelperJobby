using ApplicationDomain.Enums;
using ApplicationDomain.IndexedModels;

namespace ApplicationDomain.Abstraction.SearchIQueryRepositories;

public interface ISearchQueryRepository
{
    public Task<IEnumerable<ProcessedJobWord>> GetProcessedJobWordsByWord(string word, string location, int numberOfResultsToSkip,
        bool isRemote, decimal pay, JobTypes jobType, string? language);

    public Task<IEnumerable<ProcessedResumeWord>> GetProcessedResumeWordsByWord(int numberOfResultsToSkip, string word);
}