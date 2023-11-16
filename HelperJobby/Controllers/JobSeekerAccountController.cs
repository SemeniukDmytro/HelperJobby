using ApplicationDomain.Absraction.ICommandRepositories;
using ApplicationDomain.Absraction.IServices;
using ApplicationDomain.Models;
using AutoMapper;
using HelperJobby.DTOs.Account;
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
        
        public JobSeekerAccountController(IJobSeekerAccountService jobSeekerAccountService,
            IJobSeekerAccountCommandRepository jobSeekerAccountCommandRepository, IMapper mapper) : base(mapper)
        {
            _jobSeekerAccountService = jobSeekerAccountService;
            _jobSeekerAccountCommandRepository = jobSeekerAccountCommandRepository;
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
        public Task SaveJob(int userId, int jobId)
        {
            return null;
        }

        [HttpPost("delete-saved-job{jobId}/{userId}")]
        public Task DeleteSavedJob(int userId, int jobId)
        {
            return null;
        }
    }
}
