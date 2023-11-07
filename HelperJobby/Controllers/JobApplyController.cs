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
        public Task<IEnumerable<JobApplyDTO>> GetUserJobAppliesForOffer(int jobId)
        {
            return null;
        }

        // GET: api/JobApply/5
        [HttpGet("{id}", Name = "Get")]
        public Task<JobApplyDTO> Get(int id)
        {
            return null;
        }

        // POST: api/JobApply
        [HttpPost]
        public Task<JobApplyDTO> Post([FromBody] JobApplyDTO value)
        {
            return null;
        }

        // PUT: api/JobApply/5
        [HttpPut("{id}")]
        public Task<JobApplyDTO> Put(int id, [FromBody] JobApplyDTO value)
        {
            return null;
        }

        // DELETE: api/JobApply/5
        [HttpDelete("{id}")]
        public Task Delete(int id)
        {
            return null;
        }
    }
}
