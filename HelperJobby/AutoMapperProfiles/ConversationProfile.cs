using ApplicationDomain.MessagingRelatedModels;
using AutoMapper;
using HelperJobby.DTOs.Message;

namespace HelperJobby.AutoMapperProfiles;

public class ConversationProfile : Profile
{
    public ConversationProfile()
    {
        CreateMap<Conversation, ConversationDTO>().ReverseMap();
    }
}