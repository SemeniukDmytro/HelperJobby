using ApplicationDomain.Abstraction.ICommandRepositories;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.MessagingRelatedModels;

namespace ApplicationBLL.Services;

public class ConversationService : IConversationService
{
    private readonly IConversationQueryRepository _conversationQueryRepository;
    private readonly IConversationCommandRepository _conversationCommandRepository;
    private readonly IUserService _userService;

    public ConversationService(IConversationQueryRepository conversationQueryRepository, IConversationCommandRepository conversationCommandRepository, IUserService userService)
    {
        _conversationQueryRepository = conversationQueryRepository;
        _conversationCommandRepository = conversationCommandRepository;
        _userService = userService;
    }

    public async Task<Conversation> EnsureConversationExists(int senderId, int recipientId)
    {

        throw new NotImplementedException();

    }
}