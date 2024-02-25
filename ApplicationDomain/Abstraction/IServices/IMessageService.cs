using ApplicationDomain.MessagingRelatedModels;

namespace ApplicationDomain.Abstraction.IServices;

public interface IMessageService
{
    public Task<Message> CreateMessage(Message message, int recipientId);
}