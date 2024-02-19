using ApplicationDomain.Abstraction.ICommandRepositories;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Models;
using AutoMapper;
using HelperJobby.DTOs.Job;
using HelperJobby.DTOs.UserJobInteractions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HelperJobby.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class JobApplyController : ExtendedBaseController
{
    private readonly IJobApplyCommandRepository _jobApplyCommandRepository;
    private readonly IJobApplyQueryRepository _jobApplyQueryRepository;
    private readonly IJobApplyService _jobApplyService;
    private readonly IJobSeekerService _jobSeekerService;

    public JobApplyController(IMapper mapper, IJobApplyCommandRepository jobApplyCommandRepository,
        IJobApplyQueryRepository jobApplyQueryRepository, IJobApplyService jobApplyService,
        IJobSeekerService jobSeekerService) : base(mapper)
    {
        _jobApplyCommandRepository = jobApplyCommandRepository;
        _jobApplyQueryRepository = jobApplyQueryRepository;
        _jobApplyService = jobApplyService;
        _jobSeekerService = jobSeekerService;
    }

    // GET: api/JobApply
    [HttpGet("my-job-applies")]
    public async Task<IEnumerable<JobApplyDTO>> GetJobSeekerJobApplies()
    {
        var jobApplies =
            await _jobApplyQueryRepository.GetJobAppliesByJobSeekerId(_jobSeekerService.GetCurrentJobSeekerId());
        return _mapper.Map<IEnumerable<JobApplyDTO>>(jobApplies);
    }

    [HttpGet("{jobId}/job-applies")]
    public async Task<JobDTO> GetJobWithAppliesByJobId(int jobId)
    {
        var job = await _jobApplyService.GetJobAppliesForSpecificJob(jobId);
        return _mapper.Map<JobDTO>(job);
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
    
    // PUT api/JobApply/job-seeker/3/job/4
    [HttpPut("job-seeker/{jobSeekerId}/job-apply/{jobId}")]
    public async Task<JobApplyDTO> UpdateJobApply(int jobSeekerId, int jobId, UpdateJobApplyDTO updateJobApplyDTO)
    {
        var updatedJobApplyEntity =
            await _jobApplyService.UpdateJobApply(jobSeekerId, jobId, _mapper.Map<JobApply>(updateJobApplyDTO));
        updatedJobApplyEntity = await _jobApplyCommandRepository.UpdateJobApply(updatedJobApplyEntity);
        return _mapper.Map<JobApplyDTO>(updatedJobApplyEntity);
    }

    // DELETE: api/JobApply/5
    [HttpDelete("{jobId}")]
    public async Task Delete(int jobId)
    {
        var jobApply = await _jobApplyService.DeleteJobApply(jobId);
        await _jobApplyCommandRepository.DeleteJobApply(jobApply);
    }
}