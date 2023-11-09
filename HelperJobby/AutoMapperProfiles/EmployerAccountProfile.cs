using ApplicationDomain.Models;
using AutoMapper;
using HelperJobby.DTOs.Account;
using EmployerAccountDTO = HelperJobby.DTOs.Account.EmployerAccountDTO;
using OrganizationDTO = HelperJobby.DTOs.Organization.OrganizationDTO;
using UserDTO = HelperJobby.DTOs.User.UserDTO;

namespace HelperJobby.AutoMapperProfiles;

public class EmployerAccountProfile : Profile
{
    public EmployerAccountProfile()
    {
        CreateMap<EmployerAccount, EmployerAccountDTO>().AfterMap((src, dest, context) =>
        {
            dest.User = context.Mapper.Map<User, UserDTO>(src.User);
            dest.Organization = context.Mapper.Map<Organization, OrganizationDTO>(src.Organization);
        });
        CreateMap<EmployerAccountDTO, EmployerAccount>().AfterMap((src, dest, context) =>
        {
            dest.User = context.Mapper.Map<UserDTO, User>(src.User);
            dest.Organization = context.Mapper.Map<OrganizationDTO, Organization>(src.Organization);
        });
        CreateMap<CreateEmployerAccountDTO, EmployerAccount>().ForMember(dest => dest.Organization.Name, 
            opt => opt.MapFrom(src => src.OrganizationName))
            .ForMember(dest => dest.Organization.PhoneNumber, 
                opt => opt.MapFrom(src => src.ContactNumber))
            .ForMember(dest => dest.Organization.NumberOfEmployees, 
                opt => opt.MapFrom(src => src.NumberOfEmployees));
        CreateMap<UpdateEmployerAccountDTO, EmployerAccount>();
        ;
    }
}