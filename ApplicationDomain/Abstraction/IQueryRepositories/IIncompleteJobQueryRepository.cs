using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.IQueryRepositories;

public interface IIncompleteJobQueryRepository
{
    public Task<IncompleteJob> GetIncompleteJobById(int incompleteJobId);
    public Task<IEnumerable<IncompleteJob>> GetIncompleteJobsByEmployerId(int employerId);
    public Task<IncompleteJob> GetIncompleteJobWithEmployer(int incompleteJobId);
}