using ApplicationDomain.Models;
using AutoMapper;
using HelperJobby.DTOs.User;

namespace HelperJobby.AutoMapperProfiles;

public class UserProfile : Profile
{
    public UserProfile()
    {
        CreateMap<User, UserDTO>().ForMember(dest => dest.Password,
            opt => opt.MapFrom(src => src.PasswordHash));
        CreateMap<UserDTO, User>().ForMember(dest => dest.PasswordHash, opt =>
            opt.MapFrom(src => src.Password));
        CreateMap<CreateUpdateUserDTO, User>().ForMember(dest => dest.PasswordHash, opt =>
            opt.MapFrom(src => src.Password));
        CreateMap<LoginUserDTO, User>().ForMember(dest => dest.PasswordHash, opt =>
            opt.MapFrom(src => src.Password));
        CreateMap<UpdatedUserWithCurrentPasswordDTO, CreateUpdateUserDTO>().ReverseMap();

    }
}