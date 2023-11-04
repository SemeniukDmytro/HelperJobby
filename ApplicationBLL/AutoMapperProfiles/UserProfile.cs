using ApplicationCommon.DTOs.Account;
using ApplicationCommon.DTOs.User;
using ApplicationDAL.Entities;
using AutoMapper;

namespace ApplicationBLL.AutoMapperProfiles;

public class UserProfile : Profile
{
    public UserProfile()
    {
        CreateMap<User, UserDTO>().ForMember(dest => dest.Password,
            opt => opt.MapFrom(src => src.PasswordHash));
        CreateMap<UserDTO, User>().ForMember(dest => dest.PasswordHash, opt =>
            opt.MapFrom(src => src.Password));
        CreateMap<RegisterUserDTO, User>();
    }
}