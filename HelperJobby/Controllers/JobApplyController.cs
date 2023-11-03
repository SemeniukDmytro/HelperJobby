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
    public class JobApplyController : ControllerBase
    {
        // GET: api/JobApply
        [HttpGet("{id}/my-job-applies")]
        public Task<IEnumerable<JobApply>> GetUserJobApplies(int userId)
        {
            return null;
        }
        
        [HttpGet("{id}/offer-job-applies")]
        public Task<IEnumerable<JobApply>> GetUserJobAppliesForOffer(int jobId)
        {
            return null;
        }

        // GET: api/JobApply/5
        [HttpGet("{id}", Name = "Get")]
        public Task<JobApply> Get(int id)
        {
            return null;
        }

        // POST: api/JobApply
        [HttpPost]
        public Task<JobApply> Post([FromBody] JobApply value)
        {
            return null;
        }

        // PUT: api/JobApply/5
        [HttpPut("{id}")]
        public Task<JobApply> Put(int id, [FromBody] JobApply value)
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
