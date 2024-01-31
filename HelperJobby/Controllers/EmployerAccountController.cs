using ApplicationDomain.Abstraction.ICommandRepositories;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Models;
using AutoMapper;
using HelperJobby.DTOs.Account;
using HelperJobby.Validators;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HelperJobby.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class EmployerAccountController : ExtendedBaseController
{
    private readonly IEmployerAccountCommandRepository _accountCommandRepository;
    private readonly IEmployerAccountQueryRepository _accountQueryRepository;
    private readonly IEmployerAccountService _employerAccountService;
    private readonly IUserService _userService;

    public EmployerAccountController(IMapper mapper, IEmployerAccountCommandRepository accountCommandRepository,
        IEmployerAccountService employerAccountService, IEmployerAccountQueryRepository accountQueryRepository,
        IUserService userService) : base(mapper)
    {
        _accountCommandRepository = accountCommandRepository;
        _employerAccountService = employerAccountService;
        _accountQueryRepository = accountQueryRepository;
        _userService = userService;
    }


    [HttpGet("my-employer-account")]
    public async Task<EmployerAccountDTO> GetCurrentUserAccount()
    {
        var user = await _accountQueryRepository.GetEmployerAccountWithOrganization(_userService.GetCurrentUserId());
        return _mapper.Map<EmployerAccountDTO>(user);
    }

    [HttpGet("{userId}")]
    public async Task<EmployerAccountDTO> GetUserEmployerAccount(int userId)
    {
        var user = await _accountQueryRepository.GetEmployerAccount(userId);
        return _mapper.Map<EmployerAccountDTO>(user);
    }

    [HttpPost]
    public async Task<EmployerAccountDTO> Create([FromBody] CreateEmployerAccountDTO createdEmployerAccountDTO)
    {
        EmployerAccountDTOValidator.ValidateAccount(createdEmployerAccountDTO);
        var employerAccount =
            await _employerAccountService.CreateEmployerAccount(
                _mapper.Map<EmployerAccount>(createdEmployerAccountDTO));
        var employerAccountDTO =
            _mapper.Map<EmployerAccountDTO>(await _accountCommandRepository.Create(employerAccount));
        return employerAccountDTO;
    }

    [HttpPut("{userId}")]
    public async Task<EmployerAccountDTO> PutEmployerAccount(int userId,
        [FromBody] UpdateEmployerAccountDTO updatedAccount)
    {
        UpdateEmployerAccountDTOValidator.ValidateUser(updatedAccount);
        var employerAccount =
            await _employerAccountService.UpdateEmployerAccount(userId, _mapper.Map<EmployerAccount>(updatedAccount));
        var updatedAccountDTO =
            _mapper.Map<EmployerAccountDTO>(await _accountCommandRepository.Update(employerAccount));
        return updatedAccountDTO;
    }
}