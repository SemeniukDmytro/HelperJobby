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
        private readonly IUserService _userService;
        private readonly IJobSeekerAccountQueryRepository _jobSeekerAccountQueryRepository;
        
        public JobSeekerAccountController(IJobSeekerAccountService jobSeekerAccountService,
            IJobSeekerAccountCommandRepository jobSeekerAccountCommandRepository, IMapper mapper, ISavedJobCommandRepository savedJobCommandRepository, IUserService userService, IJobSeekerAccountQueryRepository jobSeekerAccountQueryRepository) : base(mapper)
        {
            _jobSeekerAccountService = jobSeekerAccountService;
            _jobSeekerAccountCommandRepository = jobSeekerAccountCommandRepository;
            _savedJobCommandRepository = savedJobCommandRepository;
            _userService = userService;
            _jobSeekerAccountQueryRepository = jobSeekerAccountQueryRepository;
        }
        
        [HttpGet]
        public async Task<JobSeekerAccountDTO> GetCurrentJobSeeker()
        {
            var jobSeekerAccount =
              await  _jobSeekerAccountQueryRepository.GetJobSeekerAccountByUserId(_userService.GetCurrentUserId());
            return _mapper.Map<JobSeekerAccountDTO>(jobSeekerAccount);
        }

        [HttpGet]
        public async Task<IEnumerable<SavedJobDTO>> GetSavedJobsOfCurrentJobSeeker()
        {
            var jobSeekerAccount =
                await _jobSeekerAccountQueryRepository
                    .GetJobSeekerAccountWithSavedJobs(_userService.GetCurrentUserId());
            return _mapper.Map<IEnumerable<SavedJobDTO>>(jobSeekerAccount.SavedJobs);
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
        
        [HttpPost("save-job/{jobId}/{userId}")]
        public async Task<SavedJobDTO> SaveJob(int jobId, int userId)
        {
            var savedJob = await _jobSeekerAccountService.SaveJob(jobId, userId);
            savedJob = await _savedJobCommandRepository.CreateSavedJob(savedJob);
            return _mapper.Map<SavedJobDTO>(savedJob);
        }

        [HttpPost("delete-saved-job/{jobId}/{userId}")]
        public async Task DeleteSavedJob(int jobId, int userId)
        {
            var savedJob = await _jobSeekerAccountService.RemoveJobFromSaved(jobId, userId);
            await _savedJobCommandRepository.DeleteSavedJob(savedJob);
        }
    }
}
