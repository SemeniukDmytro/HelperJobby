using ApplicationDomain.Abstraction.IServices;
using AutoMapper;
using HelperJobby.DTOs.Job;
using Microsoft.AspNetCore.Mvc;

namespace HelperJobby.Controllers;

[Route("api/[controller]")]
[ApiController]
public class RecommendationController : ExtendedBaseController
{
    private readonly IRecommendationService _recommendationService;

    public RecommendationController(IMapper mapper, IRecommendationService recommendationService) : base(mapper)
    {
        _recommendationService = recommendationService;
    }

    [HttpGet("recommended-jobs")]
    public async Task<IEnumerable<JobDTO>> GetRecommendedJobs()
    {
        var jobs = await _recommendationService.GetJobsBasedOnPreviousUserSearches();
        return _mapper.Map<IEnumerable<JobDTO>>(jobs);
    }
}