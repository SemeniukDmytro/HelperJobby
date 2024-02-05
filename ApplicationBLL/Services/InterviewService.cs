using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;

namespace ApplicationBLL.Services;

public class InterviewService : IInterviewService
{
    private readonly IEmployerQueryRepository _employerQueryRepository;
    private readonly IInterviewQueryRepository _interviewQueryRepository;
    private readonly IJobQueryRepository _jobQueryRepository;
    private readonly IJobSeekerQueryRepository _jobSeekerQueryRepository;
    private readonly IUserService _userService;

    public InterviewService(IUserService userService, IJobQueryRepository jobQueryRepository,
        IEmployerQueryRepository employerQueryRepository,
        IInterviewQueryRepository interviewQueryRepository,
        IJobSeekerQueryRepository jobSeekerQueryRepository)
    {
        _userService = userService;
        _jobQueryRepository = jobQueryRepository;
        _employerQueryRepository = employerQueryRepository;
        _interviewQueryRepository = interviewQueryRepository;
        _jobSeekerQueryRepository = jobSeekerQueryRepository;
    }

    public async Task<Job> GetInterviewsForSpecificJob(int jobId)
    {
        var currentUserId = _userService.GetCurrentUserId();
        var currentEmployer = await _employerQueryRepository.GetEmployer(currentUserId);
        var job = await _jobQueryRepository.GetJobById(jobId);
        if (job.EmployerId != currentEmployer.Id)
            throw new ForbiddenException("You can not have access to this information");

        return job;
    }

    public async Task<Interview> PostInterview(int jobId, int jobSeekerId, Interview interviewInfo)
    {
        Interview interview = null;
        try
        {
            interview = await _interviewQueryRepository.GetInterviewByJobIdAndJobSeekerIdPlain(jobId, jobSeekerId);
        }
        catch (Exception e)
        {
        }

        if (interview != null) throw new InterviewOperatingException("This interview is already created");
        var currentUserId = _userService.GetCurrentUserId();
        var currentEmployer = await _employerQueryRepository.GetEmployer(currentUserId);
        var job = await _jobQueryRepository.GetJobById(jobId);
        if (job.EmployerId != currentEmployer.Id)
            throw new ForbiddenException(
                "You can't create interview for this job. Job was created by another employer");

        if (interviewInfo.InterviewStart.TimeOfDay > interviewInfo.InterviewEnd.ToTimeSpan())
            throw new InterviewOperatingException("Invalid interview time provided");

        var newInterview = new Interview
        {
            JobId = jobId,
            JobSeekerId = jobSeekerId,
            InterviewStart = interviewInfo.InterviewStart,
            InterviewEnd = interviewInfo.InterviewEnd,
            InterviewType = interviewInfo.InterviewType,
            AppointmentInfo = interviewInfo.AppointmentInfo
        };
        return newInterview;
    }

    public async Task<Interview> CancelInterviewFromEmployerAccount(int jobId, int jobSeekerId)
    {
        var interviewEntity = await _interviewQueryRepository.GetInterviewWithJob(jobId, jobSeekerId);
        var currentUserId = _userService.GetCurrentUserId();
        var currentEmployer = await _employerQueryRepository.GetEmployer(currentUserId);
        if (interviewEntity.Job.EmployerId != currentEmployer.Id)
            throw new ForbiddenException("You can't delete interview. Because it was created by another employer");

        return interviewEntity;
    }

    public async Task<Interview> CancelInterviewFromJobSeekerAccount(int jobId)
    {
        var currentUserId = _userService.GetCurrentUserId();
        var currentJobSeeker = await _jobSeekerQueryRepository.GetJobSeekerByUserId(currentUserId);
        var interviewEntity =
            await _interviewQueryRepository.GetInterviewByJobIdAndJobSeekerIdPlain(jobId, currentJobSeeker.Id);
        return interviewEntity;
    }
}