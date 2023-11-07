using ApplicationDomain.Models;
using AutoMapper;
using HelperJobby.DTOs.Organization;

namespace HelperJobby.AutoMapperProfiles;

public class OrganizationProfile : Profile
{
    public OrganizationProfile()
    {
        CreateMap<Organization, OrganizationDTO>().ReverseMap();
    }
}