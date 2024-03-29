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
public class ResumeController : ExtendedBaseController
{
    private readonly IEnqueuingTaskHelper _enqueuingTaskHelper;
    private readonly IResumeCommandRepository _resumeCommandRepository;
    private readonly IResumeQueryRepository _resumeQueryRepository;
    private readonly IResumeService _resumeService;

    public ResumeController(IMapper mapper, IResumeQueryRepository resumeQueryRepository,
        IResumeCommandRepository resumeCommandRepository,
        IResumeService resumeService, IEnqueuingTaskHelper enqueuingTaskHelper) : base(mapper)
    {
        _resumeQueryRepository = resumeQueryRepository;
        _resumeCommandRepository = resumeCommandRepository;
        _resumeService = resumeService;
        _enqueuingTaskHelper = enqueuingTaskHelper;
    }

    // GET: api/Resume/5
    [HttpGet("{id}")]
    public async Task<ResumeDTO> GetResume(int id)
    {
        var resume = await _resumeQueryRepository.GetResumeById(id);
        return _mapper.Map<ResumeDTO>(resume);
    }

    [HttpGet("job-seeker/{jobSeekerId}")]
    public async Task<ResumeDTO> GetResumeByJobSeekerId(int jobSeekerId)
    {
        var resume = await _resumeQueryRepository.GetResumeByJobSeekerId(jobSeekerId);
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
        await _enqueuingTaskHelper.EnqueueResumeIndexingTaskAsync(async indexingService =>
        {
            await indexingService.IndexResumeContent(resume);
        });
        return _mapper.Map<ResumeDTO>(resume);
    }

    // DELETE: api/Resume/5
    [HttpDelete("{resumeId}")]
    public async Task DeleteResume(int resumeId)
    {
        var resume = await _resumeService.DeleteResume(resumeId);
        await _enqueuingTaskHelper.EnqueueResumeIndexingTaskAsync(async indexingService =>
        {
            await indexingService.RemoveResumeIndexedContent(resume);
        });
        await _resumeCommandRepository.DeleteResume(resume);
    }
}