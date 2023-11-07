using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using EmployerAccountDTO = HelperJobby.DTOs.Account.EmployerAccountDTO;

namespace HelperJobby.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class EmployerAccountController : ControllerBase
    {
        public EmployerAccountController()
        {
            
        }

        [HttpGet]
        public Task<EmployerAccountDTO> GetCurrentUserAccount()
        {
            return null;
        }

        [HttpPut("{id}")]
        public Task<EmployerAccountDTO> PutEmployerAccount(int id, [FromBody] EmployerAccountDTO updatedAccount)
        {
            return null;
        }
    }
}
