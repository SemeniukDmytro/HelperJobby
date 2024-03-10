using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.MessagingRelatedModels;

namespace ApplicationBLL.Services;

public class MessageService : IMessageService
{
    private readonly IMessageQueryRepository _messageQueryRepository;
    public MessageService(IMessageQueryRepository messageQueryRepository)
    {
        _messageQueryRepository = messageQueryRepository;
    }

    public async Task<Message> CreateMessageToEmployer(string message, int jobSeekerId, Conversation conversation)
    {
        
        var createdMessage = PopulateMessageEntityWithCommonInitialData(message, conversation);
        createdMessage.JobSeekerId = jobSeekerId;
        conversation.EmployersUnreadMessagesCount++;

        return createdMessage;

    }

    public async Task<Message> CreateMessageToJobSeeker(string message, int employerId, Conversation conversation)
    {

        var createdMessage = PopulateMessageEntityWithCommonInitialData(message, conversation);
        createdMessage.EmployerId = employerId;
        conversation.JobSeekersUnreadMessagesCount++;

        return createdMessage;
    }

    public async Task<Message> ReadMessage(int messageId, int employerId, int jobSeekerId)
    {
        var message = await _messageQueryRepository.GetMessageByIdWithConversationInfo(messageId);
        if (message.Conversation.EmployerId != employerId || message.Conversation.JobSeekerId != jobSeekerId)
        {
            throw new InvalidMessageException("Something went wrong");
        }

        message.IsRead = true;
        if (message.EmployerId != null)
        {
            message.Conversation.JobSeekersUnreadMessagesCount--;
        }
        else
        {
            message.Conversation.EmployersUnreadMessagesCount--;
        }
        return message;
    }


    private Message PopulateMessageEntityWithCommonInitialData(string message, Conversation conversation)
    {
        if (string.IsNullOrEmpty(message))
        {
            throw new InvalidMessageException();
        }

        var messageEntity = new Message()
        {
            Content = message,
            ConversationId = conversation.Id,
            Conversation = conversation,
            SentAt = DateTime.Now,
            IsRead = false
        };
        conversation.LastModified = DateTime.Now;

        return messageEntity;
    }
}