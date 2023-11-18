using ApplicationDAL.Context;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;
using Microsoft.EntityFrameworkCore;

namespace ApplicationDAL.QueryRepositories;

public class JobApplyQueryRepository : IJobApplyQueryRepository
{
    private readonly ApplicationContext _applicationContext;

    public JobApplyQueryRepository(ApplicationContext applicationContext)
    {
        _applicationContext = applicationContext;
    }

    public async Task<JobApply> GetJobApplyByJobIdAndJobSeekerId(int jobId, int jobSeekerId)
    {
        var jobApply =
            await _applicationContext.JobApplies.FirstOrDefaultAsync(j => j.JobId == jobId && j.JobSeekerAccountId == jobSeekerId);
        if (jobApply == null)
        {
            throw new JobApplyingException("Job apply wasn't found");
        }

        return jobApply;
    }
}