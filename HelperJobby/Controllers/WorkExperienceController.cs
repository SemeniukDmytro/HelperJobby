using ApplicationDomain.Abstraction.BackgroundInterfaces;
using ApplicationDomain.Abstraction.ICommandRepositories;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Models;
using AutoMapper;
using HelperJobby.DTOs.Resume;
using HelperJobby.Validators;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HelperJobby.Controllers; 

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class WorkExperienceController : ExtendedBaseController
{
    private readonly IEnqueuingTaskHelper _enqueuingTaskHelper;
    private readonly IResumeCommandRepository _resumeCommandRepository;
    private readonly IWorkExperienceCommandRepository _workExperienceCommandRepository;
    private readonly IWorkExperienceQueryRepository _workExperienceQueryRepository;
    private readonly IWorkExperienceService _workExperienceService;

    public WorkExperienceController(IMapper mapper, IWorkExperienceService workExperienceService,
        IWorkExperienceCommandRepository workExperienceCommandRepository,
        IWorkExperienceQueryRepository workExperienceQueryRepository,
        IEnqueuingTaskHelper enqueuingTaskHelper, IResumeCommandRepository resumeCommandRepository) : base(mapper)
    {
        _workExperienceService = workExperienceService;
        _workExperienceCommandRepository = workExperienceCommandRepository;
        _workExperienceQueryRepository = workExperienceQueryRepository;
        _enqueuingTaskHelper = enqueuingTaskHelper;
        _resumeCommandRepository = resumeCommandRepository;
    }

    // GET: api/WorkExperience/5
    [HttpGet("{id}")]
    public async Task<WorkExperienceDTO> GetWorkExperienceById(int id)
    {
        var workExperience = await _workExperienceQueryRepository.GetWorkExperienceById(id);
        return _mapper.Map<WorkExperienceDTO>(workExperience);
    }

    // POST: api/WorkExperience/{resumeId}
    [HttpPost("{resumeId}")]
    public async Task<WorkExperienceDTO> Post(int resumeId,
        [FromBody] CreateUpdateWorkExperienceDTO createUpdateWorkExperienceDto)
    {
        CreateUpdateWorkExperienceDTOValidator.ValidateCreatedWorkExperience(createUpdateWorkExperienceDto);
        var workExperience = _mapper.Map<WorkExperience>(createUpdateWorkExperienceDto);
        workExperience = await _workExperienceService.AddWorkExperience(resumeId, workExperience);
        workExperience = await _workExperienceCommandRepository.Create(workExperience);
        await _enqueuingTaskHelper.EnqueueResumeIndexingTaskAsync(async indexingService =>
        {
            await indexingService.IndexResumeRelatedContent(workExperience.JobTitle, workExperience.ResumeId);
        });
        return _mapper.Map<WorkExperienceDTO>(workExperience);
    }

    // PUT: api/WorkExperience/{workExperienceId}/user/{userId}
    [HttpPut("{workExperienceId}")]
    public async Task<WorkExperienceDTO> Put(int workExperienceId,
        [FromBody] CreateUpdateWorkExperienceDTO updateUpdateWorkExperienceDto)
    {
        CreateUpdateWorkExperienceDTOValidator.ValidateCreatedWorkExperience(updateUpdateWorkExperienceDto);
        var workExperience = _mapper.Map<WorkExperience>(updateUpdateWorkExperienceDto);
        workExperience = await _workExperienceService.UpdateWorkExperience(workExperienceId, workExperience);
        workExperience = await _workExperienceCommandRepository.Update(workExperience);
        return _mapper.Map<WorkExperienceDTO>(workExperience);
    }

    // DELETE: api/WorkExperience/{workExperienceId}/user/{userId}
    [HttpDelete("{workExperienceId}")]
    public async Task Delete(int workExperienceId)
    {
        var workExperienceWithResumeRelateContent = await _workExperienceService.DeleteWorkExperience(workExperienceId);
        await _enqueuingTaskHelper.EnqueueResumeIndexingTaskAsync(async indexingService =>
        {
            await indexingService.RemoveIndexedResumeRelatedContent(
                workExperienceWithResumeRelateContent.workExperience.JobTitle,
                workExperienceWithResumeRelateContent.workExperience.ResumeId);
        });
        if (workExperienceWithResumeRelateContent.isResumeNeedToBeDeleted)
            await _resumeCommandRepository.DeleteResume(workExperienceWithResumeRelateContent.workExperience.Resume);
        else
            await _workExperienceCommandRepository.Delete(workExperienceWithResumeRelateContent.workExperience);
    }
}