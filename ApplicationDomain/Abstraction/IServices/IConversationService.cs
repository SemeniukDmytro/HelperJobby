using ApplicationDomain.MessagingRelatedModels;

namespace ApplicationDomain.Abstraction.IServices;

public interface IConversationService
{
    public Task<Conversation> EnsureConversationExists(int employerId, int jobSeekerId, int jobId);
}