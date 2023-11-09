using ApplicationDomain.Absraction.ICommandRepositories;
using ApplicationDomain.Absraction.IQueryRepositories;
using ApplicationDomain.Absraction.IServices;
using ApplicationDomain.Models;
using AutoMapper;
using HelperJobby.DTOs.Account;
using HelperJobby.Validators;
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
        private readonly IEmployerAccountService _employerAccountService;
        private readonly IEmployerAccountQueryRepository _accountQueryRepository;
        private readonly IEmployerAccountCommandRepository _accountCommandRepository;
        private readonly IUserService _userService;
        
        public EmployerAccountController(IMapper mapper, IEmployerAccountCommandRepository accountCommandRepository, IEmployerAccountService employerAccountService, IEmployerAccountQueryRepository accountQueryRepository, IUserService userService) : base(mapper)
        {
            _accountCommandRepository = accountCommandRepository;
            _employerAccountService = employerAccountService;
            _accountQueryRepository = accountQueryRepository;
            _userService = userService;
        }

        [HttpPost]
        public async Task<EmployerAccountDTO> Create([FromBody] CreateEmployerAccountDTO createdEmployerAccountDTO)
        {
            EmployerAccountDTOValidator.ValidateAccount(createdEmployerAccountDTO);
            var user = await _employerAccountService.CreateEmployerAccount(_mapper.Map<EmployerAccount>(createdEmployerAccountDTO));
            var employerAccountDTO = _mapper.Map<EmployerAccountDTO>( await _accountCommandRepository.Create(user));
            return employerAccountDTO;
        }

        [HttpGet("my-employer-account")]
        public async Task<EmployerAccountDTO> GetCurrentUserAccount()
        {
            var user = await _accountQueryRepository.GetEmployerAccount(_userService.GetCurrentUserId());
            return _mapper.Map<EmployerAccountDTO>(user);
        }
        
        [HttpGet("{id}")]

        public async Task<EmployerAccountDTO> GetUserEmployerAccount(int id)
        {
            var user = await _accountQueryRepository.GetEmployerAccount(id);
            return _mapper.Map<EmployerAccountDTO>(user);
        }

        [HttpPut("{id}")]
        public Task<EmployerAccountDTO> PutEmployerAccount(int id, [FromBody] EmployerAccountDTO updatedAccount)
        {
            return null;
        }
    }
}
