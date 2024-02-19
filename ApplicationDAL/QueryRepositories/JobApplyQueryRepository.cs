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
            await _applicationContext.JobApplies.Include(ja => ja.Job).FirstOrDefaultAsync(j =>
                j.JobId == jobId && j.JobSeekerId == jobSeekerId);
        
        if (jobApply == null) throw new JobApplyingException("Job apply wasn't found");

        return jobApply;
    }

    public async Task<IEnumerable<JobApply>> GetJobAppliesByJobSeekerId(int jobSeekerId)
    {
        var jobApplies = await _applicationContext.JobApplies.Where(i => i.JobSeekerId == jobSeekerId)
            .Select(ja => new JobApply
            {
                JobId = ja.JobId,
                JobSeekerId = ja.JobSeekerId,
                DateApplied = ja.DateApplied,
                Job = new Job
                {
                    Id = ja.JobId,
                    JobTitle = ja.Job.JobTitle,
                    Employer = new Employer
                    {
                        Id = ja.Job.EmployerId,
                        Organization = new Organization
                        {
                            Id = ja.Job.Employer.OrganizationId,
                            Name = ja.Job.Employer.Organization.Name
                        }
                    },
                    Location = ja.Job.Location
                }
            }).ToListAsync();
        return jobApplies;
    }
}