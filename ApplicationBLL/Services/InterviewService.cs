using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;

namespace ApplicationBLL.Services;

public class InterviewService : IInterviewService
{
    private readonly IUserService _userService;
    private readonly IJobSeekerAccountQueryRepository _jobSeekerAccountQueryRepository;
    private readonly IJobQueryRepository _jobQueryRepository;
    private readonly IEmployerAccountQueryRepository _employerAccountQueryRepository;

    public InterviewService(IUserService userService, IJobSeekerAccountQueryRepository jobSeekerAccountQueryRepository, IJobQueryRepository jobQueryRepository, IEmployerAccountQueryRepository employerAccountQueryRepository)
    {
        _userService = userService;
        _jobSeekerAccountQueryRepository = jobSeekerAccountQueryRepository;
        _jobQueryRepository = jobQueryRepository;
        _employerAccountQueryRepository = employerAccountQueryRepository;
    }

    public async Task<Interview> PostInterview(int jobId, int jobSeekerId)
    {
        var currentUserId = _userService.GetCurrentUserId();
        var currentEmployer = await _employerAccountQueryRepository.GetEmployerWithJobs(currentUserId);
        var job = currentEmployer.Jobs.FirstOrDefault(j => j.Id == jobId);
        if (job == null)
        {
            throw new ForbiddenException("You can't create interview for this job. Job was created by another employer");
        }

        var newInterview = new Interview()
        {
            JobId = jobId,
            JobSeekerAccountId = jobSeekerId
        };
        return newInterview;
    }

    public async Task<Interview> DeleteInterview(int jobId, int jobSeekerId)
    {
        var currentUserId = _userService.GetCurrentUserId();
        var currentEmployer = await _employerAccountQueryRepository.GetEmployerWithJobs(currentUserId);
        var job = currentEmployer.Jobs.FirstOrDefault(j => j.Id == jobId);
        if (job == null)
        {
            throw new ForbiddenException("You can't delete interview. Because it was created by another employer");
        }

        var interviewEntity = new Interview()
        {
            JobId = jobId,
            JobSeekerAccountId = jobSeekerId
        };
        return interviewEntity;
    }
}