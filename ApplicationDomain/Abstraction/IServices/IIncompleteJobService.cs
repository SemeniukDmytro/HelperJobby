using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.IServices;

public interface IIncompleteJobService
{
    public Task<IncompleteJob> GetIncompleteJobById(int incompleteJobId);
    public Task<IEnumerable<IncompleteJob>> GetEmployerIncompleteJobs(int employerId);
    public Task<IEnumerable<IncompleteJob>> GetEmployerIncompleteJobTitles(int employerId);
    public Task<IncompleteJob> StartIncompleteJobCreation(IncompleteJob incompleteJob);

    public Task<IncompleteJob> UpdateIncompleteJob(int incompleteJobId, IncompleteJob updatedIncompleteJob);

    public Task<IncompleteJob> UpdateIncompleteJobSalary(int incompleteJobId,
        IncompleteJobSalary? incompleteJobSalary);

    public Task<IncompleteJob> DeleteIncompleteJob(int incompleteJobId);

    public Task<List<IncompleteJob>> DeleteIncompleteJobRange(List<int> incompleteJobIds);
}