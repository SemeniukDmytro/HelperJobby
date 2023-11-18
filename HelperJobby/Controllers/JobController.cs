using ApplicationDomain.Abstraction.ICommandRepositories;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Models;
using AutoMapper;
using HelperJobby.DTOs.Job;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using JobDTO = HelperJobby.DTOs.Job.JobDTO;

namespace HelperJobby.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class JobController : ExtendedBaseController
    {
        private readonly IJobQueryRepository _jobQueryRepository;
        private readonly IJobCommandRepository _jobCommandRepository;
        private readonly IJobService _jobService;
        private readonly ICurrentJobCreationQueryRepository _currentJobCreationQueryRepository;
        
        public JobController(IMapper mapper, IJobQueryRepository jobQueryRepository, IJobCommandRepository jobCommandRepository,
            IJobService jobService, ICurrentJobCreationQueryRepository currentJobCreationQueryRepository) : base(mapper)
        {
            _jobQueryRepository = jobQueryRepository;
            _jobCommandRepository = jobCommandRepository;
            _jobService = jobService;
            _currentJobCreationQueryRepository = currentJobCreationQueryRepository;
        }
        
        [HttpGet("jobs/{userId}")]
        public async Task<IEnumerable<JobDTO>> GetJobsByUserId(int userId)
        {
            return _mapper.Map<IEnumerable<JobDTO>>(await _jobQueryRepository.GetJobsByUserId(userId));
        }
        
        [HttpGet("organization-jobs/{organizationId}")]
        public async Task<IEnumerable<JobDTO>> GetJobsByOrganizationId(int organizationId)
        {
            return _mapper.Map<IEnumerable<JobDTO>>(await _jobQueryRepository.GetJobsByOrganizationId(organizationId));
        }
        
        [HttpGet("{employerAccountId}/job/{jobId}")]
        public async Task<JobDTO> GetJobById(int jobId, int employerAccountId)
        {
            return _mapper.Map<JobDTO>(await _jobQueryRepository.GetJobForEmployersById(jobId, employerAccountId));
        }

        [HttpPost("{employerAccountId}/create-job/{jobCreationId}")]
        public async Task<JobDTO> CreateJob(int employerAccountId, int jobCreationId)
        {
            var currentJobToCreate =
                await _currentJobCreationQueryRepository.GetJobCreationById(jobCreationId, employerAccountId);
            var createdJob = await _jobService.CreateJob(_mapper.Map<Job>(currentJobToCreate));
            createdJob = await _jobCommandRepository.CreateJob(currentJobToCreate, createdJob);
            return _mapper.Map<JobDTO>(createdJob);
        }

        [HttpPut("{employerAccountId}/update-job/{jobId}")]
        public async Task<JobDTO> PutJob(int employerAccountId, int jobId,  UpdatedJobDTO updatedJob)
        {
            var job = await _jobService.UpdateJob(jobId, employerAccountId, _mapper.Map<Job>(updatedJob));
            job = await _jobCommandRepository.UpdateJob(job);
            return _mapper.Map<JobDTO>(job);
        }

        [HttpDelete("{employerAccountId}/delete-job/{jobId}")]
        public async Task DeleteJob(int employerAccountId, int jobId)
        {
            var job = await _jobService.DeleteJob(jobId, employerAccountId);
            await _jobCommandRepository.DeleteJob(job);
        }
    }
}
