using ApplicationDomain.MessagingRelatedModels;

namespace ApplicationDomain.Abstraction.IServices;

public interface IMessageService
{
    public Task<Message> CreateMessage(string message, int senderId, int conversationId);
}