using ApplicationDomain.Models;

namespace ApplicationDomain.Absraction.ICommandRepositories;

public interface IJobCommandRepository
{
    public Task<Job> CreateJob(Job createdJob);
    public Task<Job> UpdateJob(Job updatedJob);
    public Task DeleteJob(Job job);
}