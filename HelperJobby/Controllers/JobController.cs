using ApplicationCommon.DTOs.Job;
using Microsoft.AspNetCore.Mvc;

namespace HelperJobby.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
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

        [HttpPost("save-job/{jobId}")]
        public Task SaveJob(int jobSeekerAccountId, int jobId)
        {
            return null;
        }

        [HttpPost("delete-saved-job{jobId}")]
        public Task DeleteSavedJob(int jobSeekerAccountId, int jobId)
        {
            return null;
        }
        
        
        
    }
}
