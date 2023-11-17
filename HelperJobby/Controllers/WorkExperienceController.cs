    using HelperJobby.DTOs.Resume;
    using Microsoft.AspNetCore.Mvc;

namespace HelperJobby.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkExperienceController : ControllerBase
    {

        // GET: api/WorkExperience/5
        [HttpGet("{id}")]
        public async Task<WorkExperienceDTO> GetWorkExperienceById(int id)
        {
            return null;
        }

        // POST: api/WorkExperience/{resumeId}
        [HttpPost("{resumeId}")]
        public async Task<WorkExperienceDTO> Post(int resumeId, [FromBody] CreateWorkExperienceDTO createWorkExperienceDTO)
        {
            return null;
        }

        // PUT: api/WorkExperience/{workExperienceId}/user/{userId}
        [HttpPut("{workExperienceId}/user/{userId}")]
        public async Task<WorkExperienceDTO> Put(int workExperienceId, int userId, [FromBody] CreateWorkExperienceDTO updateWorkExperienceDTO)
        {
            return null;
        }

        // DELETE: api/WorkExperience/{workExperienceId}/user/{userId}
        [HttpDelete("{workExperienceId}/user/{userId}")]
        public async Task Delete(int workExperienceId, int userId)
        {
        }
    }
}
