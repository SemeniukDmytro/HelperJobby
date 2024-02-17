using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.IServices;

public interface IJobService
{
    public Task<Job> GetJobForEmployerById(int jobId);
    public Task<IEnumerable<Job>> GetEmployerJobsByEmployerId(int employerId);
    public Task<Job> CreateJob(Job job);
    public Task<Job> UpdateJob(int jobId, Job updatedJob);
    public Task<Job> UpdateJobSalary(int jobId, JobSalary updatedSalary);
    public Task<Job> DeleteJob(int jobId);
}