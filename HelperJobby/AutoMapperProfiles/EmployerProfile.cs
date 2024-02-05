using ApplicationDomain.Models;
using AutoMapper;
using HelperJobby.DTOs.Account;
using HelperJobby.DTOs.Organization;
using HelperJobby.DTOs.User;

namespace HelperJobby.AutoMapperProfiles;

public class EmployerProfile : Profile
{
    public EmployerProfile()
    {
        CreateMap<Employer, EmployerDTO>().AfterMap((src, dest, context) =>
        {
            dest.User = context.Mapper.Map<User, UserDTO>(src.User);
            dest.Organization = context.Mapper.Map<Organization, OrganizationDTO>(src.Organization);
        });
        CreateMap<EmployerDTO, Employer>().AfterMap((src, dest, context) =>
        {
            dest.User = context.Mapper.Map<UserDTO, User>(src.User);
            dest.Organization = context.Mapper.Map<OrganizationDTO, Organization>(src.Organization);
        });
        CreateMap<CreateEmployerDTO, Employer>().AfterMap((src, dest, context) =>
        {
            dest.Organization = new Organization
            {
                Name = src.OrganizationName,
                NumberOfEmployees = src.NumberOfEmployees,
                PhoneNumber = src.ContactNumber
            };
        });
        CreateMap<UpdateEmployerDTO, Employer>();
        ;
    }
}