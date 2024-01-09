using ApplicationDomain.Abstraction.BackgroundInterfaces;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Abstraction.SearchRelatedIServices;
using ApplicationDomain.Enums;
using AutoMapper;
using HelperJobby.DTOs.Job;
using HelperJobby.DTOs.Resume;
using Microsoft.AspNetCore.Mvc;

namespace HelperJobby.Controllers;

[Route("api/[controller]")]
[ApiController]
public class SearchController : ExtendedBaseController
{
    private readonly ISearchService _searchService;
    private readonly IJobQueryRepository _jobQueryRepository;
    private readonly IResumeQueryRepository _resumeQueryRepository;
    private readonly IEnqueuingTaskHelper _enqueuingTaskHelper;
    private readonly IUserService _userService;
    
    public SearchController(IMapper mapper, ISearchService searchService, IJobQueryRepository jobQueryRepository
        , IResumeQueryRepository resumeQueryRepository, IEnqueuingTaskHelper enqueuingTaskHelper, IUserService userService) : base(mapper)
    {
        _searchService = searchService;
        _jobQueryRepository = jobQueryRepository;
        _resumeQueryRepository = resumeQueryRepository;
        _enqueuingTaskHelper = enqueuingTaskHelper;
        _userService = userService;
    }
    
    [HttpGet("jobs")]
    public async Task<IEnumerable<JobDTO>> SearchJobs(
        [FromQuery] string q,
        [FromQuery] string location = "",
        [FromQuery] int start = 0,
        [FromQuery] bool isRemote = false,
        [FromQuery] decimal pay = 0,
        [FromQuery] JobTypes jobType = 0,
        [FromQuery] string language = "")
    {
        var userId = 0;
        try
        {
            userId = _userService.GetCurrentUserId();
        }
        catch (Exception e)
        {
        }
        var jobIdsToLoad = await _searchService.FindJobIds(q, location, start, isRemote, pay, jobType, language);
        if (userId != 0)
        {
            await _enqueuingTaskHelper.EnqueueAddingRecentSearchTask(async recentUserSearchService =>
            {
                await recentUserSearchService.AddRecentSearch(q, location, userId);
            });
        }
        return _mapper.Map<IEnumerable<JobDTO>>(await _jobQueryRepository.GetJobsByJobIds(jobIdsToLoad));
    }
    
    [HttpGet("resumes")]
    public async Task<IEnumerable<ResumeDTO>> SearchResumes(string q, [FromQuery] int start)
    {
        var resumesToLoad = await _searchService.FindResumeIds(start, q);
        return _mapper.Map<IEnumerable<ResumeDTO>>(await _resumeQueryRepository.GetResumesByResumeIds(resumesToLoad));
    }
}