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
        _applicationContext.Messages.Add(message);
        await _applicationContext.SaveChangesAsync();
        return message;
    }
}