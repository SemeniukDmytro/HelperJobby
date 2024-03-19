using ApplicationDomain.MessagingRelatedModels;

namespace ApplicationDomain.Abstraction.IQueryRepositories;

public interface IConversationQueryRepository
{
    public Task<Conversation?> GetConversationPlainByJobSeekerAndEmployerJobIds(int jobSeekerId, int employerId,
        int jobId);

    public Task<Conversation?> GetConversationFullInfoByJobSeekerAndEmployerJobIds(int jobSeekerId, int employerId,
        int jobId);

    public Task<IEnumerable<Conversation>> GetConversationsByJobIdAndEmployerId(int jobId, int employerId);

    public Task<IEnumerable<Conversation>> GetConversationsByEmployerId(int employerId);
    public Task<IEnumerable<Conversation>> GetConversationsByJobSeekerId(int jobSeekerId);

    public Task<Conversation?> GetConversationWithAllInfo(int conversationId);
}