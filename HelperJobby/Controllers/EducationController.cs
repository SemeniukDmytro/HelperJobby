using ApplicationDomain.Abstraction.ICommandRepositories;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Models;
using AutoMapper;
using HelperJobby.DTOs.Resume;
using HelperJobby.Validators;
using Microsoft.AspNetCore.Mvc;

namespace HelperJobby.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EducationController : ExtendedBaseController
    {
        private readonly IEducationQueryRepository _educationQueryRepository;
        private readonly IEducationCommandRepository _educationCommandRepository;
        private readonly IEducationService _educationService;
        
        public EducationController(IMapper mapper, IEducationService educationService, 
            IEducationCommandRepository educationCommandRepository, IEducationQueryRepository educationQueryRepository) : base(mapper)
        {
            _educationService = educationService;
            _educationCommandRepository = educationCommandRepository;
            _educationQueryRepository = educationQueryRepository;
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
            return _mapper.Map<EducationDTO>(education);
        }

        // PUT: api/Education/5
        [HttpPut("{educationId}/user/{userId}")]
        public async Task<EducationDTO> Put(int educationId, int userId, [FromBody] CreateUpdateEducationDTO updateEducationDto)
        {
            CreateEducationDTOValidator.ValidateCreatedEducation(updateEducationDto);
            var education = _mapper.Map<Education>(updateEducationDto);
            education = await _educationService.UpdateEducation(educationId, userId, education);
            education = await _educationCommandRepository.Update(education);
            return _mapper.Map<EducationDTO>(education);
        }

        // DELETE: api/Education/5
        [HttpDelete("{educationId}/user/{userId}")]
        public async Task Delete(int educationId, int userId)
        {
             var education = await _educationService.Delete(educationId, userId);
             await _educationCommandRepository.Delete(education);
        }

       
    }
}
