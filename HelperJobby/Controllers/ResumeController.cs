using HelperJobby.DTOs.Resume;
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
        public Task<ResumeDTO> GetResume(int id)
        {
            return null;
        }

        // POST: api/Resume
        [HttpPost]
        public Task<ResumeDTO> PostResume([FromBody] ResumeDTO value)
        {
            return null;
        }

        // DELETE: api/Resume/5
        [HttpDelete("{id}")]
        public Task DeleteResume(int id)
        {
            return null;
        }
    }
}
