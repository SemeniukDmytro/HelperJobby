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
        var currentUserId = _userService.GetCurrentUserId();
        if (senderId != currentUserId)
        {
            throw new ForbiddenException("You can not send messages from other user account");
        }

        var conversation =
            await _conversationQueryRepository.GetConversationBySenderAndRecipientIds(senderId, recipientId);

        if (conversation == null)
        {
            conversation = new Conversation
            {
                LastModified = DateTime.UtcNow,
                ConversationUsers = new List<ChatMembership>
                {
                    new ChatMembership { UserId = senderId },
                    new ChatMembership { UserId = recipientId }
                },
                Messages = new List<Message>()
            };
            await _conversationCommandRepository.CreateConversation(conversation);
        }

        return conversation;
    }
}