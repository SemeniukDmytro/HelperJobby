using ApplicationDomain.Enums;
using ApplicationDomain.IndexedModels;

namespace ApplicationDomain.Abstraction.SearchIQueryRepositories;

public interface ISearchQueryRepository
{
    public Task<IEnumerable<ProcessedJobWord>> GetProcessedJobWordsByWord(int numberOfResultsToSkip, string word);

    public Task<IEnumerable<ProcessedResumeWord>> GetProcessedResumeWordsByWord(int numberOfResultsToSkip, string word);
    
    public Task<IEnumerable<ProcessedJobWord>> GetFilteredProcessedJobWordsByWord(int numberOfResultsToSkip, string word, bool isRemote, 
        decimal pay, JobTypes jobType, string location, string language);
}