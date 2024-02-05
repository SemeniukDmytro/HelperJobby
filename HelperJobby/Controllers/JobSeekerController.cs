using ApplicationDomain.Abstraction.ICommandRepositories;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Models;
using AutoMapper;
using HelperJobby.DTOs.Account;
using HelperJobby.DTOs.UserJobInteractions;
using HelperJobby.Validators;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HelperJobby.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class JobSeekerController : ExtendedBaseController
{
    private readonly IJobSeekerCommandRepository _jobSeekerCommandRepository;
    private readonly IJobSeekerQueryRepository _jobSeekerQueryRepository;
    private readonly IJobSeekerService _jobSeekerService;
    private readonly ISavedJobCommandRepository _savedJobCommandRepository;
    private readonly IUserService _userService;

    public JobSeekerController(IJobSeekerService jobSeekerService,
        IJobSeekerCommandRepository jobSeekerCommandRepository, IMapper mapper,
        ISavedJobCommandRepository savedJobCommandRepository, IUserService userService,
        IJobSeekerQueryRepository jobSeekerQueryRepository) : base(mapper)
    {
        _jobSeekerService = jobSeekerService;
        _jobSeekerCommandRepository = jobSeekerCommandRepository;
        _savedJobCommandRepository = savedJobCommandRepository;
        _userService = userService;
        _jobSeekerQueryRepository = jobSeekerQueryRepository;
    }

    [HttpGet("current-job-seeker")]
    public async Task<JobSeekerDTO> GetCurrentJobSeeker()
    {
        var jobSeeker =
            await _jobSeekerQueryRepository.GetJobSeekerByUserId(_userService.GetCurrentUserId());
        return _mapper.Map<JobSeekerDTO>(jobSeeker);
    }

    [HttpGet("current-job-seeker-all-info")]
    public async Task<JobSeekerDTO> GetCurrentJobSeekerAllInfo()
    {
        var jobSeeker =
            await _jobSeekerQueryRepository.GetJobSeekerWithAddressAndResume(
                _userService.GetCurrentUserId());
        return _mapper.Map<JobSeekerDTO>(jobSeeker);
    }

    [HttpGet("job-seeker-with-job-interactions")]
    public async Task<JobSeekerDTO> GetCurrentJobSeekerWithHisJobInteractions()
    {
        var jobSeeker =
            await _jobSeekerQueryRepository.GetJobSeekerWithJobInteractions(_userService.GetCurrentUserId());
        return _mapper.Map<JobSeekerDTO>(jobSeeker);
    }

    [HttpGet("my-saved-jobs")]
    public async Task<IEnumerable<SavedJobDTO>> GetSavedJobsOfCurrentJobSeeker()
    {
        var savedJobs =
            await _jobSeekerQueryRepository.GetJobSeekerSavedJobs(_userService.GetCurrentUserId());
        return _mapper.Map<IEnumerable<SavedJobDTO>>(savedJobs);
    }

    [HttpPut("{userId}")]
    public async Task<JobSeekerDTO> PutJobSeeker(int userId,
        [FromBody] UpdatedJobSeekerDTO updatedJobSeekerDTO)
    {
        UpdateJobSeekerDTOValidator.ValidateAccount(updatedJobSeekerDTO);
        var updatedJobSeeker = await _jobSeekerService.UpdateJobSeeker(userId, _mapper.Map<JobSeeker>(updatedJobSeekerDTO));
        updatedJobSeeker = await _jobSeekerCommandRepository.UpdateJobSeeker(updatedJobSeeker);
        var jobSeekerDTO = _mapper.Map<JobSeekerDTO>(updatedJobSeeker);
        return jobSeekerDTO;
    }

    [HttpPost("save-job/{jobId}")]
    public async Task<SavedJobDTO> SaveJob(int jobId)
    {
        var savedJob = await _jobSeekerService.SaveJob(jobId);
        savedJob = await _savedJobCommandRepository.CreateSavedJob(savedJob);
        return _mapper.Map<SavedJobDTO>(savedJob);
    }

    [HttpDelete("delete-saved-job/{jobId}")]
    public async Task DeleteSavedJob(int jobId)
    {
        var savedJob = await _jobSeekerService.RemoveJobFromSaved(jobId);
        await _savedJobCommandRepository.DeleteSavedJob(savedJob);
    }
}