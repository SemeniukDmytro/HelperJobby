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

    // GET: api/IncompleteJob/1/incomplete-jobs
    [HttpGet("{employerId}/incomplete-jobs")]
    public async Task<IEnumerable<IncompleteJobDTO>> GetEmployerIncompleteJobs(int employerId)
    {
        return _mapper.Map<IEnumerable<IncompleteJobDTO>>(await
            _incompleteJobQueryRepository.GetIncompleteJobsByEmployerId(employerId));
    }

    // POST: api/IncompleteJob
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

    // PUT: api/IncompleteJob/5
    [HttpPut("{incompleteJobId}")]
    public async Task<IncompleteJobDTO> Put(int incompleteJobId, [FromBody] IncompleteJobCreateDTO incompleteJobCreationDto)
    {
        var incompleteJob =
            await _incompleteJobService.UpdateIncompleteJob(incompleteJobId,
                _mapper.Map<IncompleteJob>(incompleteJobCreationDto));
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
}