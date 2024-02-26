using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.MessagingRelatedModels;

namespace ApplicationBLL.Services;

public class MessageService : IMessageService
{

    public MessageService()
    {
    }

    public async Task<Message> CreateMessage(string message, int senderId, int conversationId)
    {
        if (string.IsNullOrEmpty(message))
        {
            throw new InvalidMessageException();
        }
        
        var newMessage = new Message()
        {
            Content = message,
            SenderId = senderId,
            ConversationId = conversationId,
            IsRead = false,
            SentAt = DateTime.UtcNow
        };
        
        return newMessage;
    }

}