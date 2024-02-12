using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.IServices;

public interface IIncompleteJobService
{
    public Task<IncompleteJob> StartIncompleteJobCreation(IncompleteJob incompleteJob);

    public Task<IncompleteJob> UpdateIncompleteJob(int incompleteJobId, IncompleteJob updatedIncompleteJob);

    public Task<IncompleteJob> UpdateIncompleteJobSalary(int incompleteJobId,
        IncompleteJobSalary? incompleteJobSalary);

    public Task<IncompleteJob> DeleteIncompleteJob(int incompleteJobId);
}