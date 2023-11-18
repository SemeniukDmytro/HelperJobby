using HelperJobby.DTOs.UserJobInteractions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HelperJobby.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class InterviewController : ControllerBase
    {
        // GET: api/Interview/my-interviews
        [HttpGet("my-interviews")]
        public Task<IEnumerable<InterviewDTO>> GetCurrentJobSeekerInterviews()
        {
            return null;
        }
        
        // GET: api/Interview/{jobId}/interviews
        [HttpGet("{jobId}/interviews")]
        public async Task<IEnumerable<InterviewDTO>> GetJobAppliesByJobId(int jobId)
        {
            return null;
        }

        // GET: api/Interview/{jobId}/job-seeker/{jobSeekerId}
        [HttpGet("{jobId}/job-seeker/{jobSeekerId}")]
        public Task<InterviewDTO> Get(int id)
        {
            return null;
        }

        // POST: api/Interview/{jobId}/job-seeker/{jobSeekerId}
        [HttpPost("{jobId}/job-seeker/{jobSeekerId}")]
        public Task<InterviewDTO> CreateInterview(int jobId, int jobSeekerId)
        {
            return null;
        }

        // DELETE: api/Interview/{jobId}/job-seeker/{jobSeekerId}
        [HttpDelete("{jobId}/job-seeker/{jobSeekerId}")]
        public Task Delete(int id)
        {
            return null;
        }
    }
}
