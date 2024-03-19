using ApplicationDAL.Projections.MessagingProjections;
using ApplicationDomain.MessagingRelatedModels;
using AutoMapper;

namespace ApplicationDAL.ProjectionsToEntitiesAutomapperProfiles;

public class ConversationProfile : Profile
{
    public ConversationProfile()
    {
        CreateMap<ConversationWithLastMessage, Conversation>().AfterMap((src, dest, context) =>
        {
            dest.Messages = new List<Message> { src.LastConversationMessage };
        });
    }
}