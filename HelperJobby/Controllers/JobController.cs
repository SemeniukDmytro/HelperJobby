using ApplicationDomain.Abstraction.BackgroundInterfaces;
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
        private readonly IEnqueuingTaskHelper _enqueuingTaskHelper;
        
        public JobController(IMapper mapper, IJobQueryRepository jobQueryRepository, IJobCommandRepository jobCommandRepository,
            IJobService jobService, ICurrentJobCreationQueryRepository currentJobCreationQueryRepository,
            IEnqueuingTaskHelper enqueuingTaskHelper) : base(mapper)
        {
            _jobQueryRepository = jobQueryRepository;
            _jobCommandRepository = jobCommandRepository;
            _jobService = jobService;
            _currentJobCreationQueryRepository = currentJobCreationQueryRepository;
            _enqueuingTaskHelper = enqueuingTaskHelper;
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
        
        [HttpGet("{jobId}")]
        public async Task<JobDTO> GetJobById(int jobId)
        {
            return _mapper.Map<JobDTO>(await _jobQueryRepository.GetJobById(jobId));
        }

        [HttpPost("{jobCreationId}")]
        public async Task<JobDTO> CreateJob(int jobCreationId)
        {
            var currentJobToCreate = await _currentJobCreationQueryRepository.GetJobCreationById(jobCreationId);
            var createdJob = await _jobService.CreateJob(_mapper.Map<Job>(currentJobToCreate));
            createdJob = await _jobCommandRepository.CreateJob(currentJobToCreate, createdJob);

            await _enqueuingTaskHelper.EnqueueJobIndexingTaskAsync(async indexingService =>
            {
                await indexingService.IndexJobContent(createdJob);
            });

            return _mapper.Map<JobDTO>(createdJob);
        }

        [HttpPut("{jobId}")]
        public async Task<JobDTO> PutJob(int jobId, UpdatedJobDTO updatedJob)
        {
            var job = await _jobService.UpdateJob(jobId, _mapper.Map<Job>(updatedJob));
            job = await _jobCommandRepository.UpdateJob(job);

            await _enqueuingTaskHelper.EnqueueJobIndexingTaskAsync(async indexingService =>
            {
                await indexingService.UpdateAndIndexJobContent(job);
            });

            return _mapper.Map<JobDTO>(job);
        }

        [HttpDelete("{jobId}")]
        public async Task DeleteJob(int jobId)
        {
            var job = await _jobService.DeleteJob(jobId);

            await _enqueuingTaskHelper.EnqueueJobIndexingTaskAsync(async indexingService =>
            {
                await indexingService.RemoveIndexedJobContent(job);
            });

            await _jobCommandRepository.DeleteJob(job);
        }
    }
}
