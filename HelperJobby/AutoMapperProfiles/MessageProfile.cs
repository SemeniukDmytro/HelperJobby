﻿using ApplicationDomain.MessagingRelatedModels;
using AutoMapper;
using HelperJobby.DTOs.Message;

namespace HelperJobby.AutoMapperProfiles;

public class MessageProfile : Profile
{
    public MessageProfile()
    {
        CreateMap<Message, MessageDTO>().ReverseMap();
    }
}