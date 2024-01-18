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
    public class EducationController : ExtendedBaseController
    {
        private readonly IEducationQueryRepository _educationQueryRepository;
        private readonly IEducationCommandRepository _educationCommandRepository;
        private readonly IEducationService _educationService;
        private readonly IEnqueuingTaskHelper _enqueuingTaskHelper;
        private readonly IResumeCommandRepository _resumeCommandRepository;

        
        public EducationController(IMapper mapper, IEducationService educationService, 
            IEducationCommandRepository educationCommandRepository, IEducationQueryRepository educationQueryRepository, 
            IEnqueuingTaskHelper enqueuingTaskHelper, IResumeCommandRepository resumeCommandRepository) : base(mapper)
        {
            _educationService = educationService;
            _educationCommandRepository = educationCommandRepository;
            _educationQueryRepository = educationQueryRepository;
            _enqueuingTaskHelper = enqueuingTaskHelper;
            _resumeCommandRepository = resumeCommandRepository;
        }
        
        // GET: api/Education/5
        [HttpGet("{educationId}")]
        public async Task<EducationDTO> Get(int educationId)
        {
            var education = await _educationQueryRepository.GetEducationById(educationId);
            return _mapper.Map<EducationDTO>(education);
        }

        // POST: api/Education
        [HttpPost("{resumeId}")]
        public async Task<EducationDTO> Post(int resumeId, [FromBody] CreateUpdateEducationDTO createEducationDto)
        {
            CreateEducationDTOValidator.ValidateCreatedEducation(createEducationDto);
            var education = _mapper.Map<Education>(createEducationDto);
            education = await _educationService.AddEducation(resumeId, education);
            education = await _educationCommandRepository.Create(education);
            await _enqueuingTaskHelper.EnqueueResumeIndexingTaskAsync(async indexingService =>
            {
                await indexingService.IndexResumeRelatedContent(education.FieldOfStudy, education.ResumeId);
            });
            return _mapper.Map<EducationDTO>(education);
        }

        // PUT: api/Education/5
        [HttpPut("{educationId}")]
        public async Task<EducationDTO> Put(int educationId, [FromBody] CreateUpdateEducationDTO updateEducationDto)
        {
            CreateEducationDTOValidator.ValidateCreatedEducation(updateEducationDto);
            var education = _mapper.Map<Education>(updateEducationDto);
            education = await _educationService.UpdateEducation(educationId, education);
            education = await _educationCommandRepository.Update(education);
            return _mapper.Map<EducationDTO>(education);
        }

        // DELETE: api/Education/5
        [HttpDelete("{educationId}")]
        public async Task Delete(int educationId)
        {
             var educationWithResumeInfo = await _educationService.Delete(educationId);
             await _enqueuingTaskHelper.EnqueueResumeIndexingTaskAsync(async indexingService =>
             {
                 await indexingService.RemoveIndexedResumeRelatedContent(educationWithResumeInfo.educationToDelete.FieldOfStudy, educationWithResumeInfo.educationToDelete.ResumeId);
             });
             if (educationWithResumeInfo.isResumeNeedToBeDeleted)
             {
                 await _resumeCommandRepository.DeleteResume(educationWithResumeInfo.educationToDelete.Resume);
             }
             else
             {
                 await _educationCommandRepository.Delete(educationWithResumeInfo.educationToDelete);
             }
        }

       
    }
}
