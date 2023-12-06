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

namespace HelperJobby.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class WorkExperienceController : ExtendedBaseController
    {
        private readonly IWorkExperienceQueryRepository _workExperienceQueryRepository;
        private readonly IWorkExperienceCommandRepository _workExperienceCommandRepository;
        private readonly IWorkExperienceService _workExperienceService;
        private readonly IEnqueuingTaskHelper _enqueuingTaskHelper;
        
        public WorkExperienceController(IMapper mapper, IWorkExperienceService workExperienceService, 
            IWorkExperienceCommandRepository workExperienceCommandRepository, IWorkExperienceQueryRepository workExperienceQueryRepository,
            IEnqueuingTaskHelper enqueuingTaskHelper) : base(mapper)
        {
            _workExperienceService = workExperienceService;
            _workExperienceCommandRepository = workExperienceCommandRepository;
            _workExperienceQueryRepository = workExperienceQueryRepository;
            _enqueuingTaskHelper = enqueuingTaskHelper;
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
        public async Task<WorkExperienceDTO> Post(int resumeId, [FromBody] CreateWorkExperienceDTO createWorkExperienceDTO)
        {
            CreateUpdateWorkExperienceDTOValidator.ValidateCreatedWorkExperience(createWorkExperienceDTO);
            var workExperience = _mapper.Map<WorkExperience>(createWorkExperienceDTO);
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
        public async Task<WorkExperienceDTO> Put(int workExperienceId, [FromBody] CreateWorkExperienceDTO updateWorkExperienceDTO)
        {
            CreateUpdateWorkExperienceDTOValidator.ValidateCreatedWorkExperience(updateWorkExperienceDTO);
            var workExperience = _mapper.Map<WorkExperience>(updateWorkExperienceDTO);
            workExperience = await _workExperienceService.UpdateWorkExperience(workExperienceId, workExperience);
            workExperience = await _workExperienceCommandRepository.Update(workExperience);
            return _mapper.Map<WorkExperienceDTO>(workExperience);
        }

        // DELETE: api/WorkExperience/{workExperienceId}/user/{userId}
        [HttpDelete("{workExperienceId}")]
        public async Task Delete(int workExperienceId)
        {
            var  workExperience = await _workExperienceService.Delete(workExperienceId);
            await _enqueuingTaskHelper.EnqueueResumeIndexingTaskAsync(async indexingService =>
            {
                await indexingService.RemoveIndexedResumeRelatedContent(workExperience.JobTitle, workExperience.ResumeId);
            });
            await _workExperienceCommandRepository.Delete(workExperience);
        }
    }
}
