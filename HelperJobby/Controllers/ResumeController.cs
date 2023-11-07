using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ResumeDTO = HelperJobby.DTOs.Resume.ResumeDTO;

namespace HelperJobby.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ResumeController : ControllerBase
    {

        // GET: api/Resume/5
        [HttpGet("{id}")]
        public Task<ResumeDTO> Get(int id)
        {
            return null;
        }

        // POST: api/Resume
        [HttpPost]
        public Task<ResumeDTO> Post([FromBody] ResumeDTO value)
        {
            return null;
        }

        // PUT: api/Resume/5
        [HttpPut("{id}")]
        public Task<ResumeDTO> Put(int id, [FromBody] ResumeDTO value)
        {
            return null;
        }

        // DELETE: api/Resume/5
        [HttpDelete("{id}")]
        public Task Delete(int id)
        {
            return null;
        }
    }
}
