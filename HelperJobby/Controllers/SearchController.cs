using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.IndexedModels;
using AutoMapper;
using HelperJobby.DTOs.Job;
using Microsoft.AspNetCore.Mvc;

namespace HelperJobby.Controllers;

[Route("api/[controller]")]
[ApiController]
public class SearchController : ExtendedBaseController
{
    private readonly ISearchQueryRepository _queryRepository;
    
    public SearchController(IMapper mapper, ISearchQueryRepository queryRepository) : base(mapper)
    {
        _queryRepository = queryRepository;
    }

    [HttpGet("jobs")]
    public async Task<IEnumerable<ProcessedJobWord>> SearchJobs(string query)
    {
        return await _queryRepository.GetProcessedJobWordsByWord(query);
    }

    [HttpGet]
    public async Task<IEnumerable<JobDTO>> SearchResumes(string query)
    {
        return null;
    }
}