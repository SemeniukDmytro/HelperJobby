using ApplicationCommon.DTOs.Organization;
using ApplicationDAL.Entities;
using AutoMapper;

namespace ApplicationBLL.AutoMapperProfiles;

public class OrganizationProfile : Profile
{
    public OrganizationProfile()
    {
        CreateMap<Organization, OrganizationDTO>().ReverseMap();
    }
}