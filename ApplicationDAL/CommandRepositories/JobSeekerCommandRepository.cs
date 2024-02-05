using ApplicationDAL.Context;
using ApplicationDomain.Abstraction.ICommandRepositories;
using ApplicationDomain.Models;
using Microsoft.EntityFrameworkCore;

namespace ApplicationDAL.CommandRepositories;

public class JobSeekerCommandRepository : IJobSeekerCommandRepository
{
    private readonly ApplicationContext _applicationContext;

    public JobSeekerCommandRepository(ApplicationContext applicationContext)
    {
        _applicationContext = applicationContext;
    }

    public async Task<JobSeeker> UpdateJobSeeker(JobSeeker jobSeeker)
    {
        if (jobSeeker.Address != null && jobSeeker.Address.Id != 0)
            _applicationContext.Entry(jobSeeker.Address).State = EntityState.Modified;
        _applicationContext.JobSeekers.Update(jobSeeker);
        await _applicationContext.SaveChangesAsync();
        return jobSeeker;
    }
}