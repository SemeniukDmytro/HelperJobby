using ApplicationDomain.MessagingRelatedModels;
using AutoMapper;
using HelperJobby.DTOs.MessagingDTOs;

namespace HelperJobby.AutoMapperProfiles;

public class MessageProfile : Profile
{
    public MessageProfile()
    {
        CreateMap<CreateMessageDTO, Message>().ReverseMap();
    }
}