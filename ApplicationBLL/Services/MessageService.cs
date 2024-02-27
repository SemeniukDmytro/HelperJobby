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
        throw new NotImplementedException();

    }

}