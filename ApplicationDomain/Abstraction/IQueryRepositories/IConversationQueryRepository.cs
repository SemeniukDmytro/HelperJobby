using ApplicationDomain.MessagingRelatedModels;

namespace ApplicationDomain.Abstraction.IQueryRepositories;

public interface IConversationQueryRepository
{
    public Task<Conversation?> GetConversationBySenderAndRecipientIds(int senderId, int recipientId);
}