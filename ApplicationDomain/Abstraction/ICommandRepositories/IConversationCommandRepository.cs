using ApplicationDomain.MessagingRelatedModels;

namespace ApplicationDomain.Abstraction.ICommandRepositories;

public interface IConversationCommandRepository
{
    public Task<Conversation> CreateConversation(Conversation conversation);
}