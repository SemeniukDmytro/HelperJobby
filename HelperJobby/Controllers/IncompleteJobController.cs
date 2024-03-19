using ApplicationDomain.Abstraction.ICommandRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Models;
using AutoMapper;
using HelperJobby.DTOs.Job;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HelperJobby.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class IncompleteJobController : ExtendedBaseController
{
    private readonly IIncompleteJobCommandRepository _incompleteJobCommandRepository;
    private readonly IIncompleteJobService _incompleteJobService;

    public IncompleteJobController(IMapper mapper,
        IIncompleteJobCommandRepository incompleteJobCommandRepository,
        IIncompleteJobService incompleteJobService) : base(mapper)
    {
        _incompleteJobCommandRepository = incompleteJobCommandRepository;
        _incompleteJobService = incompleteJobService;
    }

    // GET: api/IncompleteJob/1/incomplete-jobs
    [HttpGet("{employerId}/incomplete-jobs")]
    public async Task<IEnumerable<IncompleteJobDTO>> GetIncompleteJobsByEmployerId(int employerId)
    {
        var retrievedIncompleteJob = await _incompleteJobService.GetEmployerIncompleteJobs(employerId);
        return _mapper.Map<IEnumerable<IncompleteJobDTO>>(retrievedIncompleteJob);
    }

    [HttpGet("{incompleteJobId}")]
    public async Task<IncompleteJobDTO> GetIncompleteJobById(int incompleteJobId)
    {
        var incompleteJob = await _incompleteJobService.GetIncompleteJobById(incompleteJobId);
        return _mapper.Map<IncompleteJobDTO>(incompleteJob);
    }

    [HttpGet("employer-incomplete-job-titles/{employerId}")]
    public async Task<IEnumerable<IncompleteJobDTO>> GetEmployerIncompleteJobTitles(int employerId)
    {
        var jobs = await _incompleteJobService.GetEmployerIncompleteJobTitles(employerId);
        return _mapper.Map<IEnumerable<IncompleteJobDTO>>(jobs);
    }

    // POST: api/IncompleteJob
    [HttpPost]
    public async Task<IncompleteJobDTO> Post([FromBody] CreateIncompleteJobDTO createIncompleteJobDTO)
    {
        var incompleteJob =
            await _incompleteJobService.StartIncompleteJobCreation(
                _mapper.Map<IncompleteJob>(createIncompleteJobDTO));
        var createdIncompleteJobDTO =
            _mapper.Map<IncompleteJobDTO>(
                await _incompleteJobCommandRepository.CreateIncompleteJob(incompleteJob));
        return createdIncompleteJobDTO;
    }

    // PUT: api/IncompleteJob/5
    [HttpPut("{incompleteJobId}")]
    public async Task<IncompleteJobDTO> Put(int incompleteJobId,
        [FromBody] UpdatedIncompleteJobDTO updatedIncompleteJobCreationDto)
    {
        var incompleteJob =
            await _incompleteJobService.UpdateIncompleteJob(incompleteJobId,
                _mapper.Map<IncompleteJob>(updatedIncompleteJobCreationDto));
        var incompleteJobDTO =
            _mapper.Map<IncompleteJobDTO>(
                await _incompleteJobCommandRepository.UpdateIncompleteJob(incompleteJob));
        return incompleteJobDTO;
    }

    [HttpPut("{incompleteJobId}/salary-update")]
    public async Task<IncompleteJobDTO> PutIncompleteJobSalary(int incompleteJobId,
        [FromBody] CreateUpdateSalaryDTO? updateSalaryDTO = null)
    {
        var incompleteJob = await _incompleteJobService.UpdateIncompleteJobSalary(incompleteJobId,
            _mapper.Map<IncompleteJobSalary>(updateSalaryDTO));
        var incompleteJobDTO =
            _mapper.Map<IncompleteJobDTO>(
                await _incompleteJobCommandRepository.UpdateIncompleteJob(incompleteJob));
        return incompleteJobDTO;
    }

    // DELETE: api/IncompleteJob/5
    [HttpDelete("{incompleteJobId}")]
    public async Task Delete(int incompleteJobId)
    {
        var jobCreation = await _incompleteJobService.DeleteIncompleteJob(incompleteJobId);
        await _incompleteJobCommandRepository.DeleteIncompleteJob(jobCreation);
    }

    [HttpDelete("delete-incomplete-job-range")]
    public async Task DeleteJobByIds([FromBody] List<int> jobIds)
    {
        var jobsToDelete = await _incompleteJobService.DeleteIncompleteJobRange(jobIds);
        await _incompleteJobCommandRepository.DeleteIncompleteJobsRange(jobsToDelete);
    }
}