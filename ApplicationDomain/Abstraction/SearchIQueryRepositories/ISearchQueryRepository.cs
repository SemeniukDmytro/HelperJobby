using ApplicationDomain.Enums;
using ApplicationDomain.IndexedModels;

namespace ApplicationDomain.Abstraction.SearchIQueryRepositories;

public interface ISearchQueryRepository
{
    public Task<IEnumerable<ProcessedJobWord>> GetProcessedJobWordsByWord(string word, string location, int numberOfResultsToSkip,
        bool isRemote, decimal payPerHour, decimal payPerDay, decimal payPerWeek, 
        decimal payPerMonth, decimal payPerYear, JobTypes jobType, string? language);

    public Task<IEnumerable<ProcessedResumeWord>> GetProcessedResumeWordsByWord(int numberOfResultsToSkip, string word);
}