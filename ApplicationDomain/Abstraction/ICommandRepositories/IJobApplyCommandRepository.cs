using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.ICommandRepositories;

public interface IJobApplyCommandRepository
{
    public Task<JobApply> CreateJobApply();
    public Task DeleteJobApply();
}