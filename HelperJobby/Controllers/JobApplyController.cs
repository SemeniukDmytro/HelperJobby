using ApplicationDomain.Abstraction.ICommandRepositories;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using JobApplyDTO = HelperJobby.DTOs.UserJobInteractions.JobApplyDTO;

namespace HelperJobby.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class JobApplyController : ExtendedBaseController
    {
        private readonly IJobQueryRepository _jobQueryRepository;
        private readonly IJobSeekerAccountQueryRepository _jobSeekerAccountQueryRepository;
        private readonly IJobApplyService _jobApplyService;
        private readonly IJobApplyQueryRepository _jobApplyQueryRepository;
        private readonly IJobApplyCommandRepository _jobApplyCommandRepository;
        private readonly IUserService _userService;
        
        public JobApplyController(IMapper mapper, IJobApplyCommandRepository jobApplyCommandRepository,
            IJobApplyQueryRepository jobApplyQueryRepository, IJobApplyService jobApplyService, 
            IJobSeekerAccountQueryRepository jobSeekerAccountQueryRepository, IJobQueryRepository jobQueryRepository, IUserService userService) : base(mapper)
        {
            _jobApplyCommandRepository = jobApplyCommandRepository;
            _jobApplyQueryRepository = jobApplyQueryRepository;
            _jobApplyService = jobApplyService;
            _jobSeekerAccountQueryRepository = jobSeekerAccountQueryRepository;
            _jobQueryRepository = jobQueryRepository;
            _userService = userService;
        }
        // GET: api/JobApply
        [HttpGet("my-job-applies")]
        public async Task<IEnumerable<Job>> GetUserJobApplies()
        {
            var jobApplies = await _jobSeekerAccountQueryRepository.GetJobSeekerAccountWithJobApplies(_userService.GetCurrentUserId());
            return _mapper.Map<IEnumerable<Job>>(jobApplies);
        }
        
        [HttpGet("{jobId}/job-applies")]
        public async Task<IEnumerable<JobApplyDTO>> GetJobAppliesByJobId(int jobId)
        {
            var job = await _jobApplyService.GetJobAppliesForSpecificJob(jobId);
            job = await _jobQueryRepository.GetJobWithJobApplies(job);
            return _mapper.Map<IEnumerable<JobApplyDTO>>(job.JobApplies);
        }

        // GET: api/JobApply/5
        [HttpGet("{jobId}/job-seeker/{jobSeekerId}")]
        public async Task<JobApplyDTO> GetJobApplyByJobSeekerIdAndJobId(int jobId, int jobSeekerId)
        {
            var jobApply = await _jobApplyQueryRepository.GetJobApplyByJobIdAndJobSeekerId(jobId, jobSeekerId);
            var jobApplyDTO = _mapper.Map<JobApplyDTO>(jobApply);
            return jobApplyDTO;
        }

        // POST: api/JobApply
        [HttpPost("{jobId}")]
        public async Task<JobApplyDTO> Post(int jobId)
        {
            var jobApply = await _jobApplyService.PostJobApply(jobId);
            jobApply = await _jobApplyCommandRepository.CreateJobApply(jobApply);
            return _mapper.Map<JobApplyDTO>(jobApply);
        }

        // DELETE: api/JobApply/5
        [HttpDelete("{jobId}")]
        public async Task Delete(int jobId)
        {
            var jobApply = await _jobApplyService.DeleteJobApply(jobId);
            await _jobApplyCommandRepository.DeleteJobApply(jobApply);
        }

        
    }
}
