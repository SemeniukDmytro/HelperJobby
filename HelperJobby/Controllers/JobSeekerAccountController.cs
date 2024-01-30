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
public class JobSeekerAccountController : ExtendedBaseController
{
    private readonly IJobSeekerAccountCommandRepository _jobSeekerAccountCommandRepository;
    private readonly IJobSeekerAccountQueryRepository _jobSeekerAccountQueryRepository;
    private readonly IJobSeekerAccountService _jobSeekerAccountService;
    private readonly ISavedJobCommandRepository _savedJobCommandRepository;
    private readonly IUserService _userService;

    public JobSeekerAccountController(IJobSeekerAccountService jobSeekerAccountService,
        IJobSeekerAccountCommandRepository jobSeekerAccountCommandRepository, IMapper mapper,
        ISavedJobCommandRepository savedJobCommandRepository, IUserService userService,
        IJobSeekerAccountQueryRepository jobSeekerAccountQueryRepository) : base(mapper)
    {
        _jobSeekerAccountService = jobSeekerAccountService;
        _jobSeekerAccountCommandRepository = jobSeekerAccountCommandRepository;
        _savedJobCommandRepository = savedJobCommandRepository;
        _userService = userService;
        _jobSeekerAccountQueryRepository = jobSeekerAccountQueryRepository;
    }

    [HttpGet("current-job-seeker")]
    public async Task<JobSeekerAccountDTO> GetCurrentJobSeeker()
    {
        var jobSeekerAccount =
            await _jobSeekerAccountQueryRepository.GetJobSeekerAccountByUserId(_userService.GetCurrentUserId());
        return _mapper.Map<JobSeekerAccountDTO>(jobSeekerAccount);
    }

    [HttpGet("current-job-seeker-all-info")]
    public async Task<JobSeekerAccountDTO> GetCurrentJobSeekerAllInfo()
    {
        var jobSeekerAccount =
            await _jobSeekerAccountQueryRepository.GetJobSeekerAccountWithAddressAndResume(
                _userService.GetCurrentUserId());
        return _mapper.Map<JobSeekerAccountDTO>(jobSeekerAccount);
    }

    [HttpGet("job-seeker-with-job-interactions")]
    public async Task<JobSeekerAccountDTO> GetCurrentJobSeekerWithHisJobInteractions()
    {
        var jobSeekerAccount =
            await _jobSeekerAccountQueryRepository.GetJobSeekerWithJobInteractions(_userService.GetCurrentUserId());
        return _mapper.Map<JobSeekerAccountDTO>(jobSeekerAccount);
    }

    [HttpGet("my-saved-jobs")]
    public async Task<IEnumerable<SavedJobDTO>> GetSavedJobsOfCurrentJobSeeker()
    {
        var savedJobs =
            await _jobSeekerAccountQueryRepository.GetJobSeekerSavedJobs(_userService.GetCurrentUserId());
        return _mapper.Map<IEnumerable<SavedJobDTO>>(savedJobs);
    }

    [HttpPut("{userId}")]
    public async Task<JobSeekerAccountDTO> PutJobSeekerAccount(int userId,
        [FromBody] UpdatedJobSeekerAccountDTO updatedAccountDTO)
    {
        UpdateJobSeekerAccountDTOValidator.ValidateAccount(updatedAccountDTO);
        var updatedAccount = _mapper.Map<JobSeekerAccount>(updatedAccountDTO);
        updatedAccount = await _jobSeekerAccountService.UpdateJobSeekerAccount(userId, updatedAccount);
        updatedAccount = await _jobSeekerAccountCommandRepository.UpdateJobSeekerAccount(updatedAccount);
        var jobSeekerAccountDTO = _mapper.Map<JobSeekerAccountDTO>(updatedAccount);
        return jobSeekerAccountDTO;
    }

    [HttpPost("save-job/{jobId}")]
    public async Task<SavedJobDTO> SaveJob(int jobId)
    {
        var savedJob = await _jobSeekerAccountService.SaveJob(jobId);
        savedJob = await _savedJobCommandRepository.CreateSavedJob(savedJob);
        return _mapper.Map<SavedJobDTO>(savedJob);
    }

    [HttpDelete("delete-saved-job/{jobId}")]
    public async Task DeleteSavedJob(int jobId)
    {
        var savedJob = await _jobSeekerAccountService.RemoveJobFromSaved(jobId);
        await _savedJobCommandRepository.DeleteSavedJob(savedJob);
    }
}