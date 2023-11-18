using ApplicationDAL.Context;
using ApplicationDomain.Abstraction.ICommandRepositories;
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
        var interview =
            await _applicationContext.Interviews.FirstOrDefaultAsync(j => j.JobId == jobId && j.JobSeekerAccountId == jobSeekerId);
        if (interview == null)
        {
            throw new JobApplyingException("Interview wasn't found");
        }

        return interview;
    }
}