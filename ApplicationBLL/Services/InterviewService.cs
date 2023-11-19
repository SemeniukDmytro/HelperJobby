using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;

namespace ApplicationBLL.Services;

public class InterviewService : IInterviewService
{
    private readonly IUserService _userService;
    private readonly IJobQueryRepository _jobQueryRepository;
    private readonly IEmployerAccountQueryRepository _employerAccountQueryRepository;
    private readonly IInterviewQueryRepository _interviewQueryRepository;

    public InterviewService(IUserService userService, IJobQueryRepository jobQueryRepository, 
        IEmployerAccountQueryRepository employerAccountQueryRepository, IInterviewQueryRepository interviewQueryRepository)
    {
        _userService = userService;
        _jobQueryRepository = jobQueryRepository;
        _employerAccountQueryRepository = employerAccountQueryRepository;
        _interviewQueryRepository = interviewQueryRepository;
    }

    public async Task<Interview> PostInterview(int jobId, int jobSeekerId)
    {
        Interview interview = null;
        try
        {
            interview = await _interviewQueryRepository.GetInterviewByJobIdAndJobSeekerId(jobId, jobSeekerId);
        }
        catch (Exception e)
        {
        }

        if (interview != null)
        {
            throw new InvalidInterviewException("This interview is already created");
        }
        var currentUserId = _userService.GetCurrentUserId();
        var currentEmployer = await _employerAccountQueryRepository.GetEmployerAccount(currentUserId);
        var job = await _jobQueryRepository.GetJobById(jobId);
        if (job.EmployerAccountId != currentEmployer.Id)
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
        var interview = await _interviewQueryRepository.GetInterviewWithJob(jobId, jobSeekerId);
        var currentUserId = _userService.GetCurrentUserId();
        var currentEmployer = await _employerAccountQueryRepository.GetEmployerAccount(currentUserId);
        if (interview.Job.EmployerAccountId != currentEmployer.Id)
        {
            throw new ForbiddenException("You can't delete interview. Because it was created by another employer");
        }
        
        return interview;
    }
}