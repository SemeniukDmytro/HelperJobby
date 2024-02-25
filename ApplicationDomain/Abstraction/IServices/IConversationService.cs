using ApplicationDomain.MessagingRelatedModels;

namespace ApplicationDomain.Abstraction.IServices;

public interface IConversationService
{
    public Task<Conversation> EnsureConversationExists(int senderId, int recipientId);
}