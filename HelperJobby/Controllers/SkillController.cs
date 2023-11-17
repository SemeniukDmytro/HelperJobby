using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HelperJobby.DTOs.Resume;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HelperJobby.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SkillController : ControllerBase
    {

        // GET: api/Skill/5
        [HttpGet("{id}")]
        public async Task<SkillDTO> GetSkillById(int skillId)
        {
            return null;
        }

        // POST: api/Skill
        [HttpPost("{resumeId}")]
        public async Task<SkillDTO> AddSkill(int resumeId, [FromBody] CreateSkillDTO createdSkillDTO)
        {
            return null;
        }

        // DELETE: api/Skill/5
        [HttpDelete("{skillId}/user/{userId}")]
        public void DeleteSkill(int skillId, int userId)
        {
        }
    }
}
