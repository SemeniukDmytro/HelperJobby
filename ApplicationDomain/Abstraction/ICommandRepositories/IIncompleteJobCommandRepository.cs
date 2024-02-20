using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.ICommandRepositories;

public interface IIncompleteJobCommandRepository
{
    public Task<IncompleteJob> CreateIncompleteJob(IncompleteJob job);
    public Task<IncompleteJob> UpdateIncompleteJob(IncompleteJob job);
    public Task DeleteIncompleteJob(IncompleteJob job);
    public Task DeleteIncompleteJobsRange(List<IncompleteJob> incompleteJobs);
}