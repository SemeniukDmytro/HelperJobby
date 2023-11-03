using ApplicationCommon.DTOs.Account;
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
