using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using InterviewDTO = HelperJobby.DTOs.UserJobInteractions.InterviewDTO;

namespace HelperJobby.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class InterviewController : ControllerBase
    {
        // GET: api/Interview
        [HttpGet]
        public Task<IEnumerable<InterviewDTO>> GetCurrentUserInterviews(int id)
        {
            return null;
        }

        // GET: api/Interview/5
        [HttpGet("{id}")]
        public Task<InterviewDTO> Get(int id)
        {
            return null;
        }

        // POST: api/Interview
        [HttpPost]
        public Task<InterviewDTO> Post([FromBody] InterviewDTO value)
        {
            return null;
        }

        // PUT: api/Interview/5
        [HttpPut("{id}")]
        public Task<InterviewDTO> Put(int id, [FromBody] InterviewDTO value)
        {
            return null;
        }

        // DELETE: api/Interview/5
        [HttpDelete("{id}")]
        public Task Delete(int id)
        {
            return null;
        }
    }
}
