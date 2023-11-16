using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using JobSeekerAccountDTO = HelperJobby.DTOs.Account.JobSeekerAccountDTO;

namespace HelperJobby.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
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
        
        [HttpPost("save-job/{jobId}/{userId}")]
        public Task SaveJob(int userId, int jobId)
        {
            return null;
        }

        [HttpPost("delete-saved-job{jobId}/{userId}")]
        public Task DeleteSavedJob(int userId, int jobId)
        {
            return null;
        }
    }
}
