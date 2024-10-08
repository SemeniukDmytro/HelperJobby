using ApplicationDomain.Abstraction.ICommandRepositories;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Models;
using AutoMapper;
using HelperJobby.DTOs.Organization;
using HelperJobby.Validators;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HelperJobby.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class OrganizationController : ExtendedBaseController
{
    private readonly IEmployerCommandRepository _employerCommandRepository;
    private readonly IOrganizationCommandRepository _organizationCommandRepository;
    private readonly IOrganizationQueryRepository _organizationQueryRepository;
    private readonly IOrganizationService _organizationService;

    // GET: api/Organization/5
    public OrganizationController(IOrganizationQueryRepository organizationQueryRepository,
        IOrganizationService organizationService, IOrganizationCommandRepository organizationCommandRepository,
        IMapper mapper, IEmployerCommandRepository employerCommandRepository) : base(mapper)
    {
        _organizationQueryRepository = organizationQueryRepository;
        _organizationService = organizationService;
        _organizationCommandRepository = organizationCommandRepository;
        _employerCommandRepository = employerCommandRepository;
    }

    [HttpGet("{id}")]
    public async Task<OrganizationDTO> GetOrganizationById(int id)
    {
        var organization = await _organizationQueryRepository.GetOrganizationWithEmployeeEmails(id);
        return _mapper.Map<OrganizationDTO>(organization);
    }

    // PUT: api/Organization/5
    [HttpPut("{id}")]
    public async Task<OrganizationDTO> Put(int id, [FromBody] UpdateOrganizationDTO updatedOrganizationDTO)
    {
        UpdateOrganizationDTOValidator.ValidateOrganization(updatedOrganizationDTO);
        var organization =
            await _organizationService.UpdateOrganization(id, _mapper.Map<Organization>(updatedOrganizationDTO));
        organization = await _organizationCommandRepository.UpdateOrganizationById(organization);
        return _mapper.Map<OrganizationDTO>(organization);
    }

    [HttpPost("{organizationId}/add-employee")]
    public async Task<OrganizationEmployeeEmailDTO> AddEmployeeEmail(int organizationId,
        CreateOrganizationEmployeeEmailDTO employeeEmailDTO)
    {
        OrganizationEmployeeEmailDTOValidator.ValidateEmail(employeeEmailDTO);
        var employeeEmail =
            await _organizationService.AddEmployeeEmail(organizationId,
                _mapper.Map<OrganizationEmployeeEmail>(employeeEmailDTO));
        employeeEmail = await _organizationCommandRepository.AddOrganizationEmployeesEmails(employeeEmail);
        return _mapper.Map<OrganizationEmployeeEmailDTO>(employeeEmail);
    }

    [HttpDelete("{employeeEmailId}/remove-employee")]
    public async Task RemoveEmployeeEmail(int employeeEmailId)
    {
        var employeeEmail =
            await _organizationService.RemoveEmployeeEmail(employeeEmailId);
        await _organizationCommandRepository.RemoveOrganizationEmployeesEmails(employeeEmail);
        await _employerCommandRepository.RemoveEmployeeByEmployeeEmail(employeeEmail);
    }
}