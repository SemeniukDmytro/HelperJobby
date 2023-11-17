using AutoMapper;
using HelperJobby.DTOs.Resume;
using Microsoft.AspNetCore.Mvc;

namespace HelperJobby.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EducationController : ExtendedBaseController
    {
        public EducationController(IMapper mapper) : base(mapper)
        {
        }
        
        // GET: api/Education/5
        [HttpGet("{id}")]
        public async Task<EducationDTO> Get(int id)
        {
            return null;
        }

        // POST: api/Education
        [HttpPost]
        public async Task<EducationDTO> Post(int resumeId, int userId, [FromBody] EducationDTO value)
        {
            return null;
        }

        // PUT: api/Education/5
        [HttpPut("{id}")]
        public async Task<EducationDTO> Put(int id, [FromBody] EducationDTO value)
        {
            return null;
        }

        // DELETE: api/Education/5
        [HttpDelete("{id}")]
        public async Task Delete(int id, int userId)
        {
        }

       
    }
}
