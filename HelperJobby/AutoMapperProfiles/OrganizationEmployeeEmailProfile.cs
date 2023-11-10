using ApplicationDomain.Models;
using AutoMapper;
using HelperJobby.DTOs.Organization;

namespace HelperJobby.AutoMapperProfiles;

public class OrganizationEmployeeEmailProfile : Profile
{
    public OrganizationEmployeeEmailProfile()
    {
        CreateMap<OrganizationEmployeeEmailDTO, OrganizationEmployeeEmail>().ReverseMap();
    }
}