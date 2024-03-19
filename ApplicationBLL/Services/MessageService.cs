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

    public async Task<Message> CreateMessageToEmployer(string message, int jobSeekerId, int conversationId)
    {
        var createdMessage = PopulateMessageEntityWithCommonInitialData(message, conversationId);
        createdMessage.JobSeekerId = jobSeekerId;

        return createdMessage;
    }

    public async Task<Message> CreateMessageToJobSeeker(string message, int employerId, int conversationId)
    {
        var createdMessage = PopulateMessageEntityWithCommonInitialData(message, conversationId);
        createdMessage.EmployerId = employerId;

        return createdMessage;
    }

    public async Task<Message> ReadMessage(int messageId, int employerId, int jobSeekerId)
    {
        var message = await _messageQueryRepository.GetMessageByIdWithConversationInfo(messageId);
        if (message.Conversation.EmployerId != employerId || message.Conversation.JobSeekerId != jobSeekerId)
            throw new InvalidMessageException("Something went wrong");

        message.IsRead = true;
        return message;
    }


    private Message PopulateMessageEntityWithCommonInitialData(string message, int conversationId)
    {
        if (string.IsNullOrEmpty(message)) throw new InvalidMessageException();

        var messageEntity = new Message
        {
            Content = message,
            ConversationId = conversationId,
            SentAt = DateTime.Now,
            IsRead = false
        };

        return messageEntity;
    }
}