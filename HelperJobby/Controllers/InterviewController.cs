using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApplicationDAL.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HelperJobby.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InterviewController : ControllerBase
    {
        // GET: api/Interview
        [HttpGet]
        public Task<IEnumerable<Interview>> GetCurrentUserInterviews(int id)
        {
            return null;
        }

        // GET: api/Interview/5
        [HttpGet("{id}")]
        public Task<Interview> Get(int id)
        {
            return null;
        }

        // POST: api/Interview
        [HttpPost]
        public Task<Interview> Post([FromBody] string value)
        {
            return null;
        }

        // PUT: api/Interview/5
        [HttpPut("{id}")]
        public Task<Interview> Put(int id, [FromBody] Interview value)
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
