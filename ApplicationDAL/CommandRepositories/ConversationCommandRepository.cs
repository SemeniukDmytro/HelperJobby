using ApplicationDAL.Context;
using ApplicationDomain.Abstraction.ICommandRepositories;
using ApplicationDomain.MessagingRelatedModels;
using Microsoft.EntityFrameworkCore;

namespace ApplicationDAL.CommandRepositories;

public class ConversationCommandRepository : IConversationCommandRepository
{
    private readonly ApplicationContext _applicationContext;

    public ConversationCommandRepository(ApplicationContext applicationContext)
    {
        _applicationContext = applicationContext;
    }

    public async Task<Conversation> CreateConversation(Conversation conversation)
    {
        _applicationContext.Conversations.Add(conversation);
        await _applicationContext.SaveChangesAsync();
        _applicationContext.Entry(conversation).State = EntityState.Detached;
        return conversation;
    }
}