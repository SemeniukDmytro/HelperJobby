using ApplicationDomain.Absraction.ICommandRepositories;
using ApplicationDomain.Absraction.IQueryRepositories;
using ApplicationDomain.Absraction.IServices;
using ApplicationDomain.Models;
using AutoMapper;
using HelperJobby.DTOs.Job;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using JobDTO = HelperJobby.DTOs.Job.JobDTO;

namespace HelperJobby.Controllers
{
    [Route("api/[controller]/{job}")]
    [ApiController]
    [Authorize]
    public class JobController : ExtendedBaseController
    {
        private readonly IJobQueryRepository _jobQueryRepository;
        private readonly IJobCommandRepository _jobCommandRepository;
        private readonly IJobService _jobService;
        
        public JobController(IMapper mapper, IJobQueryRepository jobQueryRepository, IJobCommandRepository jobCommandRepository,
            IJobService jobService) : base(mapper)
        {
            _jobQueryRepository = jobQueryRepository;
            _jobCommandRepository = jobCommandRepository;
            _jobService = jobService;
        }
        
        [HttpGet("jobs/{userId}")]
        public async Task<IEnumerable<JobDTO>> GetJobsByUserId(int userId)
        {
            return _mapper.Map<IEnumerable<JobDTO>>(await _jobQueryRepository.GetJobsByUserId(userId));
        }
        
        [HttpGet("organization-jobs/{id}")]
        public async Task<IEnumerable<JobDTO>> GetJobsByOrganizationId(int organizationId)
        {
            return _mapper.Map<IEnumerable<JobDTO>>(await _jobQueryRepository.GetJobsByOrganizationId(organizationId));
        }
        
        [HttpGet("{employerAccountId}/employer-job/{id}")]
        public async Task<JobDTO> GetJobById(int id, int employerAccountId)
        {
            return _mapper.Map<JobDTO>(await _jobQueryRepository.GetJobById(id, employerAccountId));
        }

        [HttpPost]
        public Task<JobDTO> CreateJob([FromBody] CurrentJobCreationDTO job)
        {
            
            return null;
        }

        [HttpPut("{id}")]
        public Task<JobDTO> PutJob(int id, int employerAccountId,  JobDTO updatedJob)
        {
            return null;
        }

        [HttpDelete("{id}")]
        public Task DeleteJob(int id, int employerAccountId)
        {
            return null;
        }
    }
}
