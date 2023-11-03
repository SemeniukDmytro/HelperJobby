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
    public class EmployerAccountController : ControllerBase
    {
        public EmployerAccountController()
        {
            
        }

        [HttpGet]
        public Task<EmployerAccount> GetCurrentUserAccount()
        {
            return null;
        }

        [HttpPut("{id}")]
        public Task<EmployerAccount> PutEmployerAccount(int id, [FromBody] EmployerAccount updatedAccount)
        {
            return null;
        }
    }
}
