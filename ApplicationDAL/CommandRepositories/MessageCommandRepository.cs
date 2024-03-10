using ApplicationDAL.Context;
using ApplicationDomain.Abstraction.ICommandRepositories;
using ApplicationDomain.Exceptions;
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
        using (var transaction = await _applicationContext.Database.BeginTransactionAsync())
        {
            try
            {
                _applicationContext.Entry(message.Conversation).Property(c => c.LastModified).IsModified = true;
                _applicationContext.Entry(message.Conversation).Property(c => c.JobSeekersUnreadMessagesCount).IsModified = true;
                _applicationContext.Entry(message.Conversation).Property(c => c.EmployersUnreadMessagesCount).IsModified = true;

            
                _applicationContext.Messages.Add(message);
                await _applicationContext.SaveChangesAsync();
                await transaction.CommitAsync();
            
                return message;
            }
            catch
            {
                await transaction.RollbackAsync();
                throw new InvalidMessageException("Something went wrong during sending message");
            }
        }
    }

    public async Task<Message> UpdateMessage(Message message)
    {
        _applicationContext.Messages.Update(message);
        await _applicationContext.SaveChangesAsync();
        return message;
    }

    public async Task<Message> UpdateMessageWithConversation(Message message)
    {
        using (var transaction = await _applicationContext.Database.BeginTransactionAsync())
        {
            try
            {
                _applicationContext.Conversations.Entry(message.Conversation).Property(c => c.JobSeekersUnreadMessagesCount).IsModified = true;
                _applicationContext.Conversations.Entry(message.Conversation).Property(c => c.EmployersUnreadMessagesCount).IsModified = true;
                _applicationContext.Messages.Update(message);
                await _applicationContext.SaveChangesAsync();
                return message;
            }
            catch
            {
                await transaction.RollbackAsync();
                throw new InvalidMessageException("Something went wrong during updating message message");
            }
        }

       
    }
}