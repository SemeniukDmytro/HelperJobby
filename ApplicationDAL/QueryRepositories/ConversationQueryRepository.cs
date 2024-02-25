using ApplicationDAL.Context;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.MessagingRelatedModels;
using Microsoft.EntityFrameworkCore;

namespace ApplicationDAL.QueryRepositories;

public class ConversationQueryRepository : IConversationQueryRepository
{
    private readonly ApplicationContext _applicationContext;

    public ConversationQueryRepository(ApplicationContext applicationContext)
    {
        _applicationContext = applicationContext;
    }

    public async Task<Conversation?> GetConversationBySenderAndRecipientIds(int senderId, int recipientId)
    {
        var conversation = await _applicationContext.Conversations
            .Where(c => c.ConversationUsers.Any(m => m.UserId == senderId) &&
                        c.ConversationUsers.Any(m => m.UserId == recipientId))
            .FirstOrDefaultAsync();

        return conversation;
    }
}