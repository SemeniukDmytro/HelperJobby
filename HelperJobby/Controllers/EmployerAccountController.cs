using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using EmployerAccountDTO = HelperJobby.DTOs.Account.EmployerAccountDTO;

namespace HelperJobby.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class EmployerAccountController : ExtendedBaseController
    {
        public EmployerAccountController(IMapper mapper) : base(mapper)
        {
            
        }

        [HttpPost]
        public Task<EmployerAccountDTO> Create([FromBody] EmployerAccountDTO employerAccountDTO)
        {
            return null;
        }

        [HttpGet("my-employer-account")]
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
