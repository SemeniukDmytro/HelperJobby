using ApplicationDAL.Context;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Exceptions;
using ApplicationDomain.MessagingRelatedModels;
using Microsoft.EntityFrameworkCore;

namespace ApplicationDAL.QueryRepositories;

public class MessageQueryRepository : IMessageQueryRepository
{
    private readonly ApplicationContext _applicationContext;

    public MessageQueryRepository(ApplicationContext applicationContext)
    {
        _applicationContext = applicationContext;
    }

    public async Task<Message> GetMessageById(int messageId)
    {
        var message = await _applicationContext.Messages.FirstOrDefaultAsync(m => m.Id == messageId);
        if (message == null)
        {
            throw new MessageNotFoundException();
        }
        return message;
    }

    public async Task<IEnumerable<Message>> GetMessagesByConversationId(int conversationId)
    {
        var messages = await _applicationContext.Messages.Where(m => m.ConversationId == conversationId).ToListAsync();
        return messages;
    }

    public async Task<Message> GetMessageByIdWithConversationInfo(int messageId)
    {
        var message = await _applicationContext.Messages.Include(m => m.Conversation).FirstOrDefaultAsync(m => m.Id == messageId);
        if (message == null)
        {
            throw new MessageNotFoundException();
        }
        return message;
    }
}