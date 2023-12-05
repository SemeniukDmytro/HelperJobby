using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.IServices;

public interface ISearchService
{
    public Task<List<int>> FindJobsIds(string query);

    public Task<List<int>> FindResumeIds(string query);
}