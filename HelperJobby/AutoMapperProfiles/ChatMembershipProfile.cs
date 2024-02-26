using ApplicationDomain.MessagingRelatedModels;
using AutoMapper;
using HelperJobby.DTOs.Message;

namespace HelperJobby.AutoMapperProfiles;

public class ChatMembershipProfile : Profile
{
    public ChatMembershipProfile()
    {
        CreateMap<ChatMembership, ChatMemebershipDTO>().ReverseMap();
    }
}