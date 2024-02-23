using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using AutoMapper;
using HelperJobby.DTOs.Job;
using Microsoft.AspNetCore.Mvc;

namespace HelperJobby.Controllers;

[Route("api/[controller]")]
[ApiController]
public class RecommendationController : ExtendedBaseController
{
    private readonly IJobQueryRepository _jobQueryRepository;
    private readonly IRecommendationService _recommendationService;

    public RecommendationController(IMapper mapper, IRecommendationService recommendationService,
        IJobQueryRepository jobQueryRepository) : base(mapper)
    {
        _recommendationService = recommendationService;
        _jobQueryRepository = jobQueryRepository;
    }

    [HttpGet("recommended-jobs")]
    public async Task<IEnumerable<JobDTO>> GetRecommendedJobs()
    {
        var jobIdsToLoad = await _recommendationService.GetJobsBasedOnPreviousUserSearches();
        return _mapper.Map<IEnumerable<JobDTO>>(await _jobQueryRepository.GetJobsByJobIds(jobIdsToLoad.ToList()));
    }

    [HttpGet("random-jobs")]
    public async Task<IEnumerable<JobDTO>> GetRandomJobs()
    {
        return _mapper.Map<IEnumerable<JobDTO>>(await _jobQueryRepository.GetRandomJobs());
    }
}