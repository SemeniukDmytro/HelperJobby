using ApplicationDomain.Absraction.ICommandRepositories;
using ApplicationDomain.Absraction.IQueryRepositories;
using ApplicationDomain.Absraction.IServices;
using ApplicationDomain.Models;
using AutoMapper;
using HelperJobby.DTOs.Organization;
using HelperJobby.Validators;
using Microsoft.AspNetCore.Mvc;

namespace HelperJobby.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrganizationController : ExtendedBaseController
    {
        private readonly IOrganizationQueryRepository _organizationQueryRepository;
        private readonly IOrganizationService _organizationService;
        private readonly IOrganizationCommandRepository _organizationCommandRepository;

        // GET: api/Organization/5
        public OrganizationController(IOrganizationQueryRepository organizationQueryRepository,
            IOrganizationService organizationService, IOrganizationCommandRepository organizationCommandRepository,
            IMapper mapper) : base(mapper)
        {
            _organizationQueryRepository = organizationQueryRepository;
            _organizationService = organizationService;
            _organizationCommandRepository = organizationCommandRepository;
        }

        [HttpGet("{id}")]
        public async Task<OrganizationDTO> GetOrganizationById(int id)
        {
            var organization = await _organizationQueryRepository.GetOrganization(id, false, true);
            return _mapper.Map<OrganizationDTO>(organization);
        }

        // PUT: api/Organization/5
        [HttpPut("{id}")]
        public async Task<OrganizationDTO> Put(int id, [FromBody] UpdateOrganizationDTO updatedOrganizationDTO)
        {
            UpdateOrganizationDTOValidator.ValidateOrganization(updatedOrganizationDTO);
            var organization = await _organizationService.UpdateOrganization(id, _mapper.Map<Organization>(updatedOrganizationDTO));
            organization = await _organizationCommandRepository.UpdateOrganizationById(id, organization);
            return _mapper.Map<OrganizationDTO>(organization);
        }

        [HttpPost("add-employee")]
        public async Task AddEmployeeEmail(OrganizationEmployeeEmailDTO employeeEmailDTO)
        {
            OrganizationEmployeeEmailDTOValidator.ValidateEmail(employeeEmailDTO);
            var employeeEmail =
                await _organizationService.AddEmployeeEmail(_mapper.Map<OrganizationEmployeeEmail>(employeeEmailDTO));
            await _organizationCommandRepository.AddOrganizationEmployeesEmails(employeeEmail);

        }
        
        [HttpPost("remove-employee")]
        public async Task RemoveEmployeeEmail(OrganizationEmployeeEmailDTO employeeEmailDTO)
        {
            OrganizationEmployeeEmailDTOValidator.ValidateEmail(employeeEmailDTO);
            var employeeEmail =
                await _organizationService.RemoveEmployeeEmail(_mapper.Map<OrganizationEmployeeEmail>(employeeEmailDTO));
            await _organizationCommandRepository.RemoveOrganizationEmployeesEmails(employeeEmail);
        }

    }
}
