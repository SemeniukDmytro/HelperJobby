using ApplicationDomain.Abstraction.ICommandRepositories;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Models;
using AutoMapper;
using HelperJobby.DTOs.Resume;
using HelperJobby.Validators;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ResumeDTO = HelperJobby.DTOs.Resume.ResumeDTO;

namespace HelperJobby.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ResumeController : ExtendedBaseController
    {
        private readonly IResumeQueryRepository _resumeQueryRepository;
        private readonly IResumeService _resumeService;
        private readonly IResumeCommandRepository _resumeCommandRepository;
        private readonly IResumeContentIndexingService _resumeContentIndexingService;
        
        public ResumeController(IMapper mapper, IResumeQueryRepository resumeQueryRepository, IResumeCommandRepository resumeCommandRepository, IResumeService resumeService, IResumeContentIndexingService resumeContentIndexingService) : base(mapper)
        {
            _resumeQueryRepository = resumeQueryRepository;
            _resumeCommandRepository = resumeCommandRepository;
            _resumeService = resumeService;
            _resumeContentIndexingService = resumeContentIndexingService;
        }

        // GET: api/Resume/5
        [HttpGet("{id}")]
        public async Task<ResumeDTO> GetResume(int id)
        {
            var resume = await _resumeQueryRepository.GetResumeById(id);
            return _mapper.Map<ResumeDTO>(resume);
        }

        // POST: api/Resume
        [HttpPost]
        public async Task<ResumeDTO> PostResume([FromBody] CreateResumeDTO createdResume)
        {
            CreateResumeValidator.ValidateCreatedResume(createdResume);
            var resume = _mapper.Map<Resume>(createdResume);
            resume = await _resumeService.CreateResume(resume);
            resume = await _resumeCommandRepository.CreateResume(resume);
            await _resumeContentIndexingService.IndexResumeContent(resume);
            return _mapper.Map<ResumeDTO>(resume);
        }

        // DELETE: api/Resume/5
            [HttpDelete("{resumeId}")]
        public async Task DeleteResume(int resumeId)
        {
            var resume = await _resumeService.DeleteResume(resumeId);
            await _resumeContentIndexingService.RemoveResumeIndexedContent(resume);
            await _resumeCommandRepository.DeleteResume(resume);
        }

        
    }
}
