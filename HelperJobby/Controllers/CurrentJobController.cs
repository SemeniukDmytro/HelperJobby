using HelperJobby.DTOs.Job;
using Microsoft.AspNetCore.Mvc;

namespace HelperJobby.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CurrentJobController : ControllerBase
    {
        // GET: api/CurrentJob/current-job-creation
        [HttpGet("current-job-creation")]
        public async Task<CurrentJobCreationDTO> GetCurrentJob(int userId)
        {
            return null;
        }

        // POST: api/CurrentJob
        [HttpPost]
        public async Task Post([FromBody] CurrentJobCreationDTO CurrentJobCreationDTO)
        {
        }

        // PUT: api/CurrentJob/5
        [HttpPut("{id}")]
        public void Put(int jobId, [FromBody] CurrentJobCreationDTO value)
        {
        }

        // DELETE: api/CurrentJob/5
        [HttpDelete("{id}")]
        public void Delete(int jobId)
        {
        }
    }
}
