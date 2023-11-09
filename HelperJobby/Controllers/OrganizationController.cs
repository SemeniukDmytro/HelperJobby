using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HelperJobby.DTOs.Organization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HelperJobby.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrganizationController : ControllerBase
    {

        // GET: api/Organization/5
        [HttpGet("{id}")]
        public async Task<OrganizationDTO> GetOrganizationById(int id)
        {
            return null;
        }

        // PUT: api/Organization/5
        [HttpPut("{id}")]
        public Task<OrganizationDTO> Put(int id, [FromBody] OrganizationDTO value)
        {
            return null;
        }

    }
}
