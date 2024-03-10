using ApplicationDomain.MessagingRelatedModels;
using AutoMapper;
using HelperJobby.DTOs.Messaging;

namespace HelperJobby.AutoMapperProfiles;

public class ConversationProfile : Profile
{
    public ConversationProfile()
    {
        CreateMap<Conversation, ConversationDTO>().ReverseMap();
        CreateMap<Conversation, ConversationWithoutMessagesDTO>().ReverseMap();
    }
}