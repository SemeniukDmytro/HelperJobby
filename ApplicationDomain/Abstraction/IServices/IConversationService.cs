using ApplicationDomain.MessagingRelatedModels;

namespace ApplicationDomain.Abstraction.IServices;

public interface IConversationService
{
    public Task<IEnumerable<Conversation>> GetEmployerConversationsByJobId(int jobId);

    public Task<IEnumerable<Conversation>> GetJobSeekerConversationsByJobId(int jobId);

    public Task<IEnumerable<Conversation>> GetCurrentEmployerConversations();
    public Task<IEnumerable<Conversation>> GetCurrentJobSeekerConversations();
    public Task<Conversation> GetConversationFullInfo(int conversationId);
    public Task<Conversation> EnsureConversationExists(int employerId, int jobSeekerId, int jobId);
}