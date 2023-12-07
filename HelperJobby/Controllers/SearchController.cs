using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Abstraction.SearchRelatedIServices;
using ApplicationDomain.Enums;
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
    public async Task<IEnumerable<JobDTO>> SearchJobs(
        [FromQuery] string query,
        [FromQuery] string location,
        [FromQuery] int start = 0,
        [FromQuery] bool isRemote = false,
        [FromQuery] decimal pay = 0,
        [FromQuery] JobTypes jobType = 0,
        [FromQuery] string language = "")
    {
        var jobIdsToLoad = await _searchService.FindJobIds(query, location, start, isRemote, pay, jobType, language);
        return _mapper.Map<IEnumerable<JobDTO>>(await _jobQueryRepository.GetJobsByJobIds(jobIdsToLoad));
    }
    
    [HttpGet("resumes")]
    public async Task<IEnumerable<ResumeDTO>> SearchResumes(string query, [FromQuery] int start)
    {
        var resumesToLoad = await _searchService.FindResumeIds(start, query);
        return _mapper.Map<IEnumerable<ResumeDTO>>(await _resumeQueryRepository.GetResumesByResumeIds(resumesToLoad));
    }
}