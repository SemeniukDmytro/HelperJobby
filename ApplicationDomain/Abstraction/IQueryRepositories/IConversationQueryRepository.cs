using ApplicationDomain.MessagingRelatedModels;

namespace ApplicationDomain.Abstraction.IQueryRepositories;

public interface IConversationQueryRepository
{
    public Task<Conversation?> GetConversationByJobSeekerAndEmployerJobIds(int jobSeekerId, int employerId, int jobId);
    public Task<IEnumerable<Conversation>> GetConversationsByJobId(int jobId);

    public Task<Conversation?> GetConversationWithAllInfo(int conversationId);
}