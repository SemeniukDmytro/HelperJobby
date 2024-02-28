using ApplicationDomain.MessagingRelatedModels;
using AutoMapper;
using HelperJobby.DTOs.Messaging;

namespace HelperJobby.AutoMapperProfiles;

public class MessageProfile : Profile
{
    public MessageProfile()
    {
        CreateMap<Message, MessageDTO>().ReverseMap();
    }
}