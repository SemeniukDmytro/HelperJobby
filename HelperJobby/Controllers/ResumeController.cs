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
    public class ResumeController : ControllerBase
    {

        // GET: api/Resume/5
        [HttpGet("{id}")]
        public Task<Resume> Get(int id)
        {
            return null;
        }

        // POST: api/Resume
        [HttpPost]
        public Task<Resume> Post([FromBody] Resume value)
        {
            return null;
        }

        // PUT: api/Resume/5
        [HttpPut("{id}")]
        public Task<Resume> Put(int id, [FromBody] Resume value)
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
