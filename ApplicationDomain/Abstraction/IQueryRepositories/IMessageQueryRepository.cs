using ApplicationDomain.MessagingRelatedModels;

namespace ApplicationDomain.Abstraction.IQueryRepositories;

public interface IMessageQueryRepository
{
    public Task<Message> GetMessageById(int messageId);
    public Task<IEnumerable<Message>> GetMessagesByConversationId(int conversationId);
    public Task<Message> GetMessageByIdWithConversationInfo(int messageId);
}