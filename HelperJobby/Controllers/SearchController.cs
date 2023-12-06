using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Abstraction.SearchRelatedIServices;
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
    
    //GET: api/search/jobs?query={your query}&start={how many jobs to skip}
    [HttpGet("jobs")]
    public async Task<IEnumerable<JobDTO>> SearchJobs(string query, string start)
    {
        var jobIdsToLoad = await _searchService.FindJobsIds(int.Parse(start), query);
        return _mapper.Map<IEnumerable<JobDTO>>(await _jobQueryRepository.GetJobsByJobIds(jobIdsToLoad));
    }
    
    //GET: api/search/resumes?query={your query}&start={how many resumes to skip}
    [HttpGet("resumes")]
    public async Task<IEnumerable<ResumeDTO>> SearchResumes(string query, string start)
    {
        var resumesToLoad = await _searchService.FindResumeIds(int.Parse(start), query);
        return _mapper.Map<IEnumerable<ResumeDTO>>(await _resumeQueryRepository.GetResumesByResumeIds(resumesToLoad));
    }
}