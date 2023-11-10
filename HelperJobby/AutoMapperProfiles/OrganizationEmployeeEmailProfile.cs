using ApplicationDomain.Models;
using AutoMapper;
using HelperJobby.DTOs.Organization;

namespace HelperJobby.AutoMapperProfiles;

public class OrganizationEmployeeEmailProfile : Profile
{
    OrganizationEmployeeEmailProfile()
    {
        CreateMap<OrganizationEmployeeEmailDTO, OrganizationEmployeeEmail>().AfterMap((src, dest, context) =>
            dest.Organization = context.Mapper.Map<OrganizationDTO, Organization>(src.Organization));
        CreateMap<OrganizationEmployeeEmail, OrganizationEmployeeEmailDTO>().AfterMap((src, dest, context) =>
            dest.Organization = context.Mapper.Map<Organization, OrganizationDTO>(src.Organization));
    }
}