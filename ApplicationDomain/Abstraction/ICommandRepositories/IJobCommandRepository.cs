using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.ICommandRepositories;

public interface IJobCommandRepository
{
    public Task<Job> CreateJob(CurrentJobCreation currentJobCreation, Job createdJob);
    public Task<Job> UpdateJob(Job updatedJob);
    public Task DeleteJob(Job job);
}