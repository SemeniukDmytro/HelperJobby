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
public class EmployerController : ExtendedBaseController
{
    private readonly IEmployerCommandRepository _commandRepository;
    private readonly IEmployerQueryRepository _queryRepository;
    private readonly IEmployerAccountService _employerAccountService;
    private readonly IUserService _userService;

    public EmployerController(IMapper mapper, IEmployerCommandRepository commandRepository,
        IEmployerAccountService employerAccountService, IEmployerQueryRepository queryRepository,
        IUserService userService) : base(mapper)
    {
        _commandRepository = commandRepository;
        _employerAccountService = employerAccountService;
        _queryRepository = queryRepository;
        _userService = userService;
    }


    [HttpGet("my-employer-account")]
    public async Task<EmployerDTO> GetCurrentEmployer()
    {
        var user = await _queryRepository.GetEmployerWithOrganization(_userService.GetCurrentUserId());
        return _mapper.Map<EmployerDTO>(user);
    }

    [HttpGet("{userId}")]
    public async Task<EmployerDTO> GetUserEmployerAccount(int userId)
    {
        var user = await _queryRepository.GetEmployer(userId);
        return _mapper.Map<EmployerDTO>(user);
    }

    [HttpPost]
    public async Task<EmployerDTO> Create([FromBody] CreateEmployerDTO createdEmployerDTO)
    {
        EmployerDTOValidator.ValidateAccount(createdEmployerDTO);
        var employerAccount =
            await _employerAccountService.CreateEmployer(
                _mapper.Map<Employer>(createdEmployerDTO));
        var employerDTO =
            _mapper.Map<EmployerDTO>(await _commandRepository.CreateEmployer(employerAccount));
        return employerDTO;
    }

    [HttpPut("{userId}")]
    public async Task<EmployerDTO> PutEmployerAccount(int userId,
        [FromBody] UpdateEmployerDTO updatedEmployerDTO)
    {
        UpdateEmployerDTOValidator.ValidateUser(updatedEmployerDTO);
        var updateEmployer =
            await _employerAccountService.UpdateEmployer(userId, _mapper.Map<Employer>(updatedEmployerDTO));
        var employerDTO =
            _mapper.Map<EmployerDTO>(await _commandRepository.UpdateEmployer(updateEmployer));
        return employerDTO;
    }
}