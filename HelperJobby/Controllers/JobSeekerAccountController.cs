using ApplicationCommon.DTOs.Account;
using Microsoft.AspNetCore.Mvc;

namespace HelperJobby.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobSeekerAccountController : ControllerBase
    {
        public JobSeekerAccountController()
        {
            
        }
        
        [HttpGet]
        public Task<JobSeekerAccountDTO> GetCurrentUserAccount()
        {
            return null;
        }

        [HttpPut("{id}")]
        public Task<JobSeekerAccountDTO> PutJobSeekerAccount(int id, [FromBody] JobSeekerAccountDTO updatedAccount)
        {
            return null;
        }
    }
}
