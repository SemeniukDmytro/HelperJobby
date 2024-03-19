using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;

namespace ApplicationBLL.Services;

public class InterviewService : IInterviewService
{
    private readonly IEmployerService _employerService;
    private readonly IInterviewQueryRepository _interviewQueryRepository;
    private readonly IJobQueryRepository _jobQueryRepository;
    private readonly IJobSeekerService _jobSeekerService;

    public InterviewService(IJobQueryRepository jobQueryRepository,
        IInterviewQueryRepository interviewQueryRepository,
        IEmployerService employerService, IJobSeekerService jobSeekerService)
    {
        _jobQueryRepository = jobQueryRepository;
        _interviewQueryRepository = interviewQueryRepository;
        _employerService = employerService;
        _jobSeekerService = jobSeekerService;
    }

    public async Task<Job> GetInterviewsForSpecificJob(int jobId)
    {
        var currentEmployerId = _employerService.GetCurrentEmployerId();
        var job = await _jobQueryRepository.GetJobWithInterviews(jobId);
        if (job.EmployerId != currentEmployerId)
            throw new ForbiddenException("You do not have access to this information");

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
        var currentEmployerId = _employerService.GetCurrentEmployerId();
        var job = await _jobQueryRepository.GetJobByIdForEmployers(jobId);
        if (job.EmployerId != currentEmployerId)
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
        var currentEmployerId = _employerService.GetCurrentEmployerId();
        if (interviewEntity.Job.EmployerId != currentEmployerId)
            throw new ForbiddenException("You can't delete interview. Because it was created by another employer");

        return interviewEntity;
    }

    public async Task<Interview> CancelInterviewFromJobSeekerAccount(int jobId)
    {
        var currentJobSeekerId = _jobSeekerService.GetCurrentJobSeekerId();
        var interviewEntity =
            await _interviewQueryRepository.GetInterviewByJobIdAndJobSeekerId(jobId, currentJobSeekerId);
        return interviewEntity;
    }
}