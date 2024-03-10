using ApplicationDomain.MessagingRelatedModels;

namespace ApplicationDomain.Abstraction.IServices;

public interface IMessageService
{
    public Task<Message> CreateMessageToEmployer(string message, int jobSeekerId, Conversation conversation);

    public Task<Message> CreateMessageToJobSeeker(string message, int employerId, Conversation conversation);

    public Task<Message> ReadMessage(int messageId, int employerId, int jobSeekerId);
}