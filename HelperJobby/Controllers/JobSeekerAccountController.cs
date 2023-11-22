using ApplicationDomain.Abstraction.ICommandRepositories;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Models;
using AutoMapper;
using HelperJobby.DTOs.Account;
using HelperJobby.DTOs.Job;
using HelperJobby.DTOs.UserJobInteractions;
using HelperJobby.Validators;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using JobSeekerAccountDTO = HelperJobby.DTOs.Account.JobSeekerAccountDTO;

namespace HelperJobby.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class JobSeekerAccountController : ExtendedBaseController
    {
        private readonly IJobSeekerAccountService _jobSeekerAccountService;
        private readonly IJobSeekerAccountCommandRepository _jobSeekerAccountCommandRepository;
        private readonly ISavedJobCommandRepository _savedJobCommandRepository;
        private readonly IJobQueryRepository _jobQueryRepository;
        private readonly IUserService _userService;
        private readonly IJobSeekerAccountQueryRepository _jobSeekerAccountQueryRepository;
        
        public JobSeekerAccountController(IJobSeekerAccountService jobSeekerAccountService,
            IJobSeekerAccountCommandRepository jobSeekerAccountCommandRepository, IMapper mapper, ISavedJobCommandRepository savedJobCommandRepository, IUserService userService, IJobSeekerAccountQueryRepository jobSeekerAccountQueryRepository, IJobQueryRepository jobQueryRepository) : base(mapper)
        {
            _jobSeekerAccountService = jobSeekerAccountService;
            _jobSeekerAccountCommandRepository = jobSeekerAccountCommandRepository;
            _savedJobCommandRepository = savedJobCommandRepository;
            _userService = userService;
            _jobSeekerAccountQueryRepository = jobSeekerAccountQueryRepository;
            _jobQueryRepository = jobQueryRepository;
        }
        
        [HttpGet("current-job-seeker")]
        public async Task<JobSeekerAccountDTO> GetCurrentJobSeeker()
        {
            var jobSeekerAccount =
              await  _jobSeekerAccountQueryRepository.GetJobSeekerAccountByUserId(_userService.GetCurrentUserId());
            return _mapper.Map<JobSeekerAccountDTO>(jobSeekerAccount);
        }

        [HttpGet("my-saved-jobs")]
        public async Task<IEnumerable<JobDTO>> GetSavedJobsOfCurrentJobSeeker()
        {
            var savedJobs =
                (await _jobQueryRepository.GetJobSeekerSavedJobs(_userService.GetCurrentUserId()));
            return _mapper.Map<IEnumerable<JobDTO>>(savedJobs);
        }

        [HttpPut("{userId}")]
        public async Task<JobSeekerAccountDTO> PutJobSeekerAccount(int userId, [FromBody] UpdatedJobSeekerAccountDTO updatedAccountDTO)
        {
            UpdateJobSeekerAccountDTOValidator.ValidateAccount(updatedAccountDTO);
            var updatedAccount = _mapper.Map<JobSeekerAccount>(updatedAccountDTO);
            updatedAccount = await _jobSeekerAccountService.UpdateJobSeekerAccount(userId, updatedAccount);
            updatedAccount = await _jobSeekerAccountCommandRepository.UpdateJobSeekerAccount(updatedAccount);
            var jobSeekerAccountDTO = _mapper.Map<JobSeekerAccountDTO>(updatedAccount);
            return jobSeekerAccountDTO;
        }
        
        [HttpPost("save-job/{jobId}/{jobSeekerId}")]
        public async Task<SavedJobDTO> SaveJob(int jobId, int jobSeekerId)
        {
            var savedJob = await _jobSeekerAccountService.SaveJob(jobId, jobSeekerId);
            savedJob = await _savedJobCommandRepository.CreateSavedJob(savedJob);
            return _mapper.Map<SavedJobDTO>(savedJob);
        }

        [HttpDelete("delete-saved-job/{jobId}/{jobSeekerId}")]
        public async Task DeleteSavedJob(int jobId, int jobSeekerId)
        {
            var savedJob = await _jobSeekerAccountService.RemoveJobFromSaved(jobId, jobSeekerId);
            await _savedJobCommandRepository.DeleteSavedJob(savedJob);
        }
    }
}
