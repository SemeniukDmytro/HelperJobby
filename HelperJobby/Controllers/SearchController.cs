using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.IndexedModels;
using ApplicationDomain.Models;
using AutoMapper;
using HelperJobby.DTOs.Job;
using HelperJobby.DTOs.Resume;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HelperJobby.Controllers;

[Route("api/[controller]")]
[ApiController]
public class SearchController : ExtendedBaseController
{
    private readonly ISearchService _searchService;
    private readonly IJobQueryRepository _jobQueryRepository;
    private readonly IResumeQueryRepository _resumeQueryRepository;
    
    public SearchController(IMapper mapper, ISearchService searchService, IJobQueryRepository jobQueryRepository
        , IResumeQueryRepository resumeQueryRepository) : base(mapper)
    {
        _searchService = searchService;
        _jobQueryRepository = jobQueryRepository;
        _resumeQueryRepository = resumeQueryRepository;
    }

    [HttpGet("jobs")]
    public async Task<IEnumerable<JobDTO>> SearchJobs(string query)
    {
        var jobIdsToLoad = await _searchService.FindJobsIds(query);
        return _mapper.Map<IEnumerable<JobDTO>>(await _jobQueryRepository.GetJobsByJobIds(jobIdsToLoad));
    }

    [HttpGet("resumes")]
    public async Task<IEnumerable<ResumeDTO>> SearchResumes(string query)
    {
        var resumesToLoad = await _searchService.FindResumeIds(query);
        return _mapper.Map<IEnumerable<ResumeDTO>>(await _resumeQueryRepository.GetResumesByResumeIds(resumesToLoad));
    }
}