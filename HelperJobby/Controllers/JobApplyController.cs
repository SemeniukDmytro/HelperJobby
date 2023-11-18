using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using JobApplyDTO = HelperJobby.DTOs.UserJobInteractions.JobApplyDTO;

namespace HelperJobby.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class JobApplyController : ControllerBase
    {
        // GET: api/JobApply
        [HttpGet("{id}/my-job-applies")]
        public Task<IEnumerable<JobApplyDTO>> GetUserJobApplies(int userId)
        {
            return null;
        }
        
        [HttpGet("job/{id}/job-aplies")]
        public Task<IEnumerable<JobApplyDTO>> GetUserJobAppliesByJobId(int jobId)
        {
            return null;
        }

        // GET: api/JobApply/5
        [HttpGet("{jobId}/job-seeker/{jobSeekerId}")]
        public Task<JobApplyDTO> GetJobApplyByJobSeekerIdAndJobId(int jobId, int jobSeekerId)
        {
            return null;
        }

        // POST: api/JobApply
        [HttpPost("{jobId}/user/{userId}")]
        public Task<JobApplyDTO> Post(int userId, int jobId)
        {
            return null;
        }

        // DELETE: api/JobApply/5
        [HttpDelete("{jobId}/jobSeeker/{jobSeekerId}")]
        public Task Delete(int jobId, int jobSeekerId)
        {
            return null;
        }
    }
}
