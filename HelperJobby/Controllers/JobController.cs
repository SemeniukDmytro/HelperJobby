using ApplicationDAL.Entities;
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
        public Task<IEnumerable<Job>> GetJobsByUserId(int id)
        {
            return null;
        }
        
        [HttpGet("{id}")]
        public Task<Job> GetJobById(int id)
        {
            return null;
        }

        [HttpPost]
        public Task<Job> CreateJob([FromBody] Job job)
        {
            return null;
        }

        [HttpPut("{id}")]
        public Task<Job> PutJob(int id, Job updatedJob)
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
