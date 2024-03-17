using ApplicationDomain.Abstraction.BackgroundInterfaces;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Abstraction.SearchRelatedIServices;
using ApplicationDomain.Enums;
using AutoMapper;
using HelperJobby.DTOs.Job;
using HelperJobby.DTOs.Resume;
using HelperJobby.DTOs.SearchDTOs;
using Microsoft.AspNetCore.Mvc;

namespace HelperJobby.Controllers;

[Route("api/[controller]")]
[ApiController]
public class SearchController : ExtendedBaseController
{
    private readonly IEnqueuingTaskHelper _enqueuingTaskHelper;
    private readonly IJobQueryRepository _jobQueryRepository;
    private readonly IResumeQueryRepository _resumeQueryRepository;
    private readonly ISearchService _searchService;
    private readonly IUserService _userService;
    private readonly IEmployerService _employerService;

    public SearchController(IMapper mapper, ISearchService searchService, IJobQueryRepository jobQueryRepository
        , IResumeQueryRepository resumeQueryRepository, IEnqueuingTaskHelper enqueuingTaskHelper,
        IUserService userService, IEmployerService employerService) : base(mapper)
    {
        _searchService = searchService;
        _jobQueryRepository = jobQueryRepository;
        _resumeQueryRepository = resumeQueryRepository;
        _enqueuingTaskHelper = enqueuingTaskHelper;
        _userService = userService;
        _employerService = employerService;
    }

    [HttpGet("jobs")]
    public async Task<JobSearchResultDTO> SearchJobs(
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
            await _enqueuingTaskHelper.EnqueueAddingRecentSearchTask(async recentUserSearchService =>
            {
                await recentUserSearchService.AddRecentSearch(q, location, userId);
            });
        int? currentEmployerId = null;
        try
        {
            currentEmployerId = _employerService.GetCurrentEmployerId();
        }
        catch (Exception e)
        {
            
        }

        var searchResultDTO = new JobSearchResultDTO
        {
            jobs = _mapper.Map<IEnumerable<JobDTO>>(await _jobQueryRepository.GetJobsByJobIds(jobIdsToLoad.jobIds, currentEmployerId)),
            HasMore = jobIdsToLoad.hasMoreResults
        };
        return searchResultDTO;
    }

    [HttpGet("resumes")]
    public async Task<ResumeSearchResultDTO> SearchResumes(string q, [FromQuery] int start)
    {
        var resumesToLoad = await _searchService.FindResumeIds(start, q);
        var resumeSearchResultDTO = new ResumeSearchResultDTO
        {
            Resumes = _mapper.Map<IEnumerable<ResumeDTO>>(
                await _resumeQueryRepository.GetResumesByResumeIds(resumesToLoad.resumeIds)),
            HasMore = resumesToLoad.hasMoreResults
        };
        return resumeSearchResultDTO;
    }
}