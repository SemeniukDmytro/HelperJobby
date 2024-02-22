using ApplicationDomain.Abstraction.ICommandRepositories;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Models;
using AutoMapper;
using HelperJobby.DTOs.Job;
using HelperJobby.DTOs.UserJobInteractions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HelperJobby.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class InterviewController : ExtendedBaseController
{
    private readonly IInterviewCommandRepository _interviewCommandRepository;
    private readonly IInterviewQueryRepository _interviewQueryRepository;
    private readonly IInterviewService _interviewService;
    private readonly IJobSeekerService _jobSeekerService;


    public InterviewController(IMapper mapper,
        IInterviewService interviewService, IInterviewCommandRepository interviewCommandRepository,
        IInterviewQueryRepository interviewQueryRepository, IJobSeekerService jobSeekerService) : base(mapper)
    {
        _interviewService = interviewService;
        _interviewCommandRepository = interviewCommandRepository;
        _interviewQueryRepository = interviewQueryRepository;
        _jobSeekerService = jobSeekerService;
    }

    // GET: api/Interview/my-interviews
    [HttpGet("my-interviews")]
    public async Task<IEnumerable<InterviewDTO>> GetCurrentJobSeekerInterviews()
    {
        var currentJobSeeker = await _interviewQueryRepository.GetInterviewsByJobSeekerId(
            _jobSeekerService.GetCurrentJobSeekerId());
        return _mapper.Map<IEnumerable<InterviewDTO>>(currentJobSeeker);
    }

    // GET: api/Interview/{jobId}/interviews
    [HttpGet("{jobId}/interviews")]
    public async Task<JobDTO> GetJobInterviewsByJobId(int jobId)
    {
        var job = await _interviewService.GetInterviewsForSpecificJob(jobId);
        return _mapper.Map<JobDTO>(job);
    }

    // GET: api/Interview/{jobId}/job-seeker/{jobSeekerId}
    [HttpGet("{jobId}/job-seeker/{jobSeekerId}")]
    public async Task<InterviewDTO> Get(int jobId, int jobSeekerId)
    {
        var interview = await _interviewQueryRepository.GetInterviewByJobIdAndJobSeekerId(jobId, jobSeekerId);
        return _mapper.Map<InterviewDTO>(interview);
    }

    // POST: api/Interview/{jobId}/job-seeker/{jobSeekerId}
    [HttpPost("{jobId}/job-seeker/{jobSeekerId}")]
    public async Task<InterviewDTO> CreateInterview(int jobId, int jobSeekerId,
        [FromBody] CreateInterviewDTO createInterviewDTO)
    {
        var createdInterviewInfo = _mapper.Map<Interview>(createInterviewDTO);
        var interview = await _interviewService.PostInterview(jobId, jobSeekerId, createdInterviewInfo);
        interview = await _interviewCommandRepository.CreateInterview(interview);
        return _mapper.Map<InterviewDTO>(interview);
    }

    // DELETE: api/Interview/{jobId}/job-seeker/{jobSeekerId}
    [HttpDelete("{jobId}/job-seeker/{jobSeekerId}")]
    public async Task EmployerCancelInterview(int jobId, int jobSeekerId)
    {
        var interview = await _interviewService.CancelInterviewFromEmployerAccount(jobId, jobSeekerId);
        await _interviewCommandRepository.DeleteInterview(interview);
    }

    // DELETE: api/Interview/{jobId}/
    [HttpDelete("{jobId}")]
    public async Task JobSeekerCancelInterview(int jobId)
    {
        var interview = await _interviewService.CancelInterviewFromJobSeekerAccount(jobId);
        await _interviewCommandRepository.DeleteInterview(interview);
    }
}