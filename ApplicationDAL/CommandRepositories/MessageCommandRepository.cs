using ApplicationDAL.Context;
using ApplicationDomain.Abstraction.ICommandRepositories;
using ApplicationDomain.MessagingRelatedModels;

namespace ApplicationDAL.CommandRepositories;

public class MessageCommandRepository : IMessageCommandRepository
{
    private readonly ApplicationContext _applicationContext;

    public MessageCommandRepository(ApplicationContext applicationContext)
    {
        _applicationContext = applicationContext;
    }

    public async Task<Message> CreateMessage(Message message)
    {
        if (message.Conversation == null)
        {
            var conversationStub = new Conversation { Id = message.ConversationId };
            _applicationContext.Conversations.Attach(conversationStub);
            conversationStub.LastModified = message.SentAt;
            _applicationContext.Entry(conversationStub).Property(x => x.LastModified).IsModified = true;
        }
        
        _applicationContext.Messages.Add(message);
        await _applicationContext.SaveChangesAsync();
        return message;
    }

    public async Task<Message> UpdateMessage(Message message)
    {
        _applicationContext.Messages.Update(message);
        await _applicationContext.SaveChangesAsync();
        return message;
    }
}