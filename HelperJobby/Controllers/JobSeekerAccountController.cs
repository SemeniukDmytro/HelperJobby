using ApplicationDomain.Absraction.ICommandRepositories;
using ApplicationDomain.Absraction.IServices;
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
        
        public JobSeekerAccountController(IJobSeekerAccountService jobSeekerAccountService,
            IJobSeekerAccountCommandRepository jobSeekerAccountCommandRepository, IMapper mapper, ISavedJobCommandRepository savedJobCommandRepository) : base(mapper)
        {
            _jobSeekerAccountService = jobSeekerAccountService;
            _jobSeekerAccountCommandRepository = jobSeekerAccountCommandRepository;
            _savedJobCommandRepository = savedJobCommandRepository;
        }
        
        [HttpGet]
        public Task<JobSeekerAccountDTO> GetCurrentUserAccount()
        {
            return null;
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
