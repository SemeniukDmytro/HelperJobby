using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.ICommandRepositories;

public interface IJobApplyCommandRepository
{
    public Task<JobApply> CreateJobApply(JobApply jobApply);
    public Task DeleteJobApply(JobApply jobApply);
}