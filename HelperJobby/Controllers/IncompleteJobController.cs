using ApplicationDomain.Abstraction.ICommandRepositories;
using ApplicationDomain.Abstraction.IQueryRepositories;
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
    private readonly IIncompleteJobQueryRepository _incompleteJobQueryRepository;
    private readonly IIncompleteJobService _incompleteJobService;

    public IncompleteJobController(IMapper mapper,
        IIncompleteJobCommandRepository incompleteJobCommandRepository,
        IIncompleteJobQueryRepository incompleteJobQueryRepository,
        IIncompleteJobService incompleteJobService) : base(mapper)
    {
        _incompleteJobCommandRepository = incompleteJobCommandRepository;
        _incompleteJobQueryRepository = incompleteJobQueryRepository;
        _incompleteJobService = incompleteJobService;
    }

    // GET: api/CurrentJob/current-job-creation
    [HttpGet("{employerId}/incomplete-job")]
    public async Task<IncompleteJobDTO> GetCurrentJob(int employerId)
    {
        return _mapper.Map<IncompleteJobDTO>(await
            _incompleteJobQueryRepository.GetIncompleteJobByEmployerId(employerId));
    }

    // POST: api/CurrentJob
    [HttpPost]
    public async Task<IncompleteJobDTO> Post([FromBody] IncompleteJobCreateDTO incompleteJobCreateDto)
    {
        var incompleteJob =
            await _incompleteJobService.StartIncompleteJobCreation(
                _mapper.Map<IncompleteJob>(incompleteJobCreateDto));
        var createdIncompleteJobDTO =
            _mapper.Map<IncompleteJobDTO>(
                await _incompleteJobCommandRepository.CreateIncompleteJob(incompleteJob));
        return createdIncompleteJobDTO;
    }

    // PUT: api/CurrentJob/5
    [HttpPut("{currentJobId}")]
    public async Task<IncompleteJobDTO> Put(int currentJobId, [FromBody] IncompleteJobCreateDTO incompleteJobCreationDto)
    {
        var incompleteJob =
            await _incompleteJobService.UpdateIncompleteJob(currentJobId,
                _mapper.Map<IncompleteJob>(incompleteJobCreationDto));
        var incompleteJobDTO =
            _mapper.Map<IncompleteJobDTO>(
                await _incompleteJobCommandRepository.UpdateIncompleteJob(incompleteJob));
        return incompleteJobDTO;
    }

    // DELETE: api/CurrentJob/5
    [HttpDelete("{jobId}")]
    public async Task Delete(int jobId)
    {
        var jobCreation = await _incompleteJobService.DeleteIncompleteJob(jobId);
        await _incompleteJobCommandRepository.DeleteIncompleteJob(jobCreation);
    }
}