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
    private readonly IEmployerService _employerService;
    private readonly IUserService _userService;

    public EmployerController(IMapper mapper, IEmployerCommandRepository commandRepository,
        IEmployerService employerService, IEmployerQueryRepository queryRepository,
        IUserService userService) : base(mapper)
    {
        _commandRepository = commandRepository;
        _employerService = employerService;
        _queryRepository = queryRepository;
        _userService = userService;
    }


    [HttpGet("my-employer-account")]
    public async Task<EmployerDTO> GetCurrentEmployer()
    {
        var currentEmployerId = _employerService.GetCurrentEmployerId();
        var employer = await _queryRepository.GetEmployerByIdWithOrganization(currentEmployerId);
        return _mapper.Map<EmployerDTO>(employer);
    }

    [HttpPost]
    public async Task<EmployerDTO> Create([FromBody] CreateEmployerDTO createdEmployerDTO)
    {
        EmployerDTOValidator.ValidateAccount(createdEmployerDTO);
        var employerAccount =
            await _employerService.CreateEmployer(
                _mapper.Map<Employer>(createdEmployerDTO));
        var employerDTO =
            _mapper.Map<EmployerDTO>(await _commandRepository.CreateEmployer(employerAccount));
        return employerDTO;
    }

    [HttpPut("{employerId}")]
    public async Task<EmployerDTO> PutEmployerAccount(int employerId,
        [FromBody] UpdateEmployerDTO updatedEmployerDTO)
    {
        UpdateEmployerDTOValidator.ValidateUser(updatedEmployerDTO);
        var updateEmployer =
            await _employerService.UpdateEmployer(employerId, _mapper.Map<Employer>(updatedEmployerDTO));
        var employerDTO =
            _mapper.Map<EmployerDTO>(await _commandRepository.UpdateEmployer(updateEmployer));
        return employerDTO;
    }
}