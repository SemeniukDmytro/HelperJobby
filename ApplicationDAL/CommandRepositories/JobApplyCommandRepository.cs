using ApplicationDAL.Context;
using ApplicationDomain.Abstraction.ICommandRepositories;
using ApplicationDomain.Models;

namespace ApplicationDAL.CommandRepositories;

public class JobApplyCommandRepository : IJobApplyCommandRepository
{
    private readonly ApplicationContext _applicationContext;

    public JobApplyCommandRepository(ApplicationContext applicationContext)
    {
        _applicationContext = applicationContext;
    }

    public async Task<JobApply> CreateJobApply(JobApply jobApply)
    {
        _applicationContext.JobApplies.Add(jobApply);
        await _applicationContext.SaveChangesAsync();
        return jobApply;
    }

    public async Task DeleteJobApply(JobApply jobApply)
    {
        _applicationContext.JobApplies.Remove(jobApply);
        await _applicationContext.SaveChangesAsync();
    }
}