using AutoMapper;
using HelperJobby.DTOs.Job;
using Microsoft.AspNetCore.Mvc;

namespace HelperJobby.Controllers;

public class SearchController : ExtendedBaseController
{
    public SearchController(IMapper mapper) : base(mapper)
    {
    }

    [HttpGet]
    public async Task<IEnumerable<JobDTO>> SearchJobs(string query)
    {
        return null;
    }

    [HttpGet]
    public async Task<IEnumerable<JobDTO>> SearchResumes(string query)
    {
        return null;
    }
}