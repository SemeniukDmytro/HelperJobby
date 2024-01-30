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

    public async Task<Interview> GetInterviewByJobIdAndJobSeeker(int jobId, int jobSeekerId)
    {
        return await GetInterview(jobId, jobSeekerId, q => q
            .Include(i => i.JobSeekerAccount));
    }

    public async Task<Interview> GetInterviewByJobIdAndJobSeekerIdPlain(int jobId, int jobSeekerId)
    {
        return await GetInterview(jobId, jobSeekerId);
    }

    public async Task<Interview> GetInterviewWithJob(int jobId, int jobSeekerId)
    {
        return await GetInterview(jobId, jobSeekerId, q => q.Include(i => i.Job));
    }

    private async Task<Interview> GetInterview(int jobId, int jobSeekerId,
        Func<IQueryable<Interview>, IQueryable<Interview>> includeFunc = null)
    {
        var query = _applicationContext.Interviews.Where(j => j.JobId == jobId && j.JobSeekerAccountId == jobSeekerId);

        if (includeFunc != null) query = includeFunc(query);

        var interview = await query.FirstOrDefaultAsync();

        if (interview == null) throw new InterviewOperatingException("Interview wasn't found");

        return interview;
    }
}