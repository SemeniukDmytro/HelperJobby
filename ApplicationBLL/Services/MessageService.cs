using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.MessagingRelatedModels;

namespace ApplicationBLL.Services;

public class MessageService : IMessageService
{
    public MessageService()
    {
    }

    public async Task<Message> CreateMessageToEmployer(string message, int jobSeekerId, int conversationId)
    {
        
        var createdMessage = PopulateMessageEntityWithCommonInitialData(message, conversationId);
        createdMessage.EmployerId = jobSeekerId;

        return createdMessage;

    }

    public async Task<Message> CreateMessageToJobSeeker(string message, int employerId, int conversationId)
    {

        var createdMessage = PopulateMessageEntityWithCommonInitialData(message, conversationId);
        createdMessage.EmployerId = employerId;

        return createdMessage;
    }


    private Message PopulateMessageEntityWithCommonInitialData(string message, int conversationId)
    {
        if (string.IsNullOrEmpty(message))
        {
            throw new InvalidMessageException();
        }

        var messageEntity = new Message()
        {
            Content = message,
            ConversationId = conversationId,
            SentAt = DateTime.Now,
            IsRead = false
        };

        return messageEntity;
    }
}