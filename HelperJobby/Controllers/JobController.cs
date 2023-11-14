using ApplicationDomain.Models;
using HelperJobby.DTOs.Job;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using JobDTO = HelperJobby.DTOs.Job.JobDTO;

namespace HelperJobby.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class JobController : ControllerBase
    {
        public JobController()
        {
            
        }
        
        [HttpGet("jobs/{id}")]
        public Task<IEnumerable<JobDTO>> GetJobsByUserId(int id)
        {
            return null;
        }
        
        [HttpGet("{id}")]
        public Task<JobDTO> GetJobById(int id)
        {
            return null;
        }

        [HttpPost]
        public Task<JobDTO> CreateJob([FromBody] JobDTO job)
        {
            return null;
        }

        [HttpPut("{id}")]
        public Task<JobDTO> PutJob(int id, JobDTO updatedJob)
        {
            return null;
        }

        [HttpDelete("{id}")]
        public Task DeleteJob(int id)
        {
            return null;
        }
    }
}
