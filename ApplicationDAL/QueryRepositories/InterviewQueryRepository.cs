using ApplicationDAL.Context;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;
using Microsoft.EntityFrameworkCore;

namespace ApplicationDAL.QueryRepositories;

public class InterviewQueryRepository : IInterviewQueryRepository
{
    private readonly ApplicationContext _applicationContext;

    public InterviewQueryRepository(ApplicationContext applicationContext)
    {
        _applicationContext = applicationContext;
    }

    public async Task<Interview> GetInterviewByJobIdAndJobSeekerId(int jobId, int jobSeekerId)
    {
        return await GetInterview(jobId, jobSeekerId, q => q
            .Include(i => i.JobSeeker));
    }

    public async Task<Interview> GetInterviewByJobIdAndJobSeekerIdPlain(int jobId, int jobSeekerId)
    {
        return await GetInterview(jobId, jobSeekerId);
    }

    public async Task<Interview> GetInterviewWithJob(int jobId, int jobSeekerId)
    {
        return await GetInterview(jobId, jobSeekerId, q => q.Include(i => i.Job));
    }

    public async Task<IEnumerable<Interview>> GetInterviewsByJobSeekerId(int jobSeekerId)
    {
        var interviews = await _applicationContext.Interviews.Where(i => i.JobSeekerId == jobSeekerId)
            .Select(i => new Interview
            {
                JobId = i.JobId,
                JobSeekerId = i.JobSeekerId,
                InterviewStart = i.InterviewStart,
                InterviewEnd = i.InterviewEnd,
                InterviewType = i.InterviewType,
                AppointmentInfo = i.AppointmentInfo,
                Job = new Job
                {
                    Id = i.JobId,
                    JobTitle = i.Job.JobTitle,
                    Employer = new Employer
                    {
                        Id = i.Job.EmployerId,
                        Organization = new Organization
                        {
                            Id = i.Job.Employer.OrganizationId,
                            Name = i.Job.Employer.Organization.Name
                        }
                    },
                    Location = i.Job.Location
                }
            }).ToListAsync();
        return interviews;
    }

    private async Task<Interview> GetInterview(int jobId, int jobSeekerId,
        Func<IQueryable<Interview>, IQueryable<Interview>> includeFunc = null)
    {
        var query = _applicationContext.Interviews.Where(j => j.JobId == jobId && j.JobSeekerId == jobSeekerId);

        if (includeFunc != null) query = includeFunc(query);

        var interview = await query.FirstOrDefaultAsync();

        if (interview == null) throw new InterviewOperatingException("Interview wasn't found");

        return interview;
    }
}