using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.IServices;

public interface ISearchService
{
    public Task<IEnumerable<Job>> FindJobs(string query);

    public Task<IEnumerable<Resume>> FindResumes(string query);
}