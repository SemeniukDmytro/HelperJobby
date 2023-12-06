namespace ApplicationDomain.Abstraction.SearchRelatedIServices;

public interface ISearchService
{
    public Task<List<int>> FindJobsIds(int numberOfResultsToSkip, string query);

    public Task<List<int>> FindResumeIds(int numberOfResultsToSkip, string query);
    
    
}