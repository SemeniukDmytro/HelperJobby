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
    public class SkillController : ExtendedBaseController
    {
        private readonly ISkillService _skillService;
        private readonly ISkillCommandRepository _skillCommandRepository;
        private readonly ISkillQueryRepository _skillQueryRepository;
        
        public SkillController(IMapper mapper, ISkillCommandRepository skillCommandRepository, 
            ISkillService skillService, ISkillQueryRepository skillQueryRepository) : base(mapper)
        {
            _skillCommandRepository = skillCommandRepository;
            _skillService = skillService;
            _skillQueryRepository = skillQueryRepository;
        }

        // GET: api/Skill/5
        [HttpGet("{skillId}")]
        public async Task<SkillDTO> GetSkillById(int skillId)
        {
            var skillEntity = await _skillQueryRepository.GetSkillById(skillId);
            return _mapper.Map<SkillDTO>(skillEntity);
        }

        // POST: api/Skill
        [HttpPost("{resumeId}")]
        public async Task<SkillDTO> AddSkill(int resumeId, [FromBody] CreateSkillDTO createdSkillDTO)
        {
            CreateSkillDTOValidator.ValidateCreatedSkill(createdSkillDTO);
            var skill = _mapper.Map<Skill>(createdSkillDTO);
            skill = await _skillService.AddSkill(resumeId, skill);
            skill = await _skillCommandRepository.CreateSkill(skill);
            return _mapper.Map<SkillDTO>(skill);
        }

        // DELETE: api/Skill/5
        [HttpDelete("{skillId}")]
        public async Task DeleteSkill(int skillId)
        {
            var skillEntity = await _skillService.DeleteSkill(skillId);
            await _skillCommandRepository.DeleteSkill(skillEntity);
        }

    }
}
