using ApplicationDomain.Models;
using AutoMapper;
using HelperJobby.DTOs.User;

namespace HelperJobby.AutoMapperProfiles;

public class UserRelatedSearchProfile : Profile
{
    public UserRelatedSearchProfile()
    {
        CreateMap<RecentUserSearchDTO, RecentUserSearch>().ReverseMap();
    }
}