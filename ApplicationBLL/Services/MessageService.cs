using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.MessagingRelatedModels;

namespace ApplicationBLL.Services;

public class MessageService : IMessageService
{
    private readonly IUserService _userService;
    private readonly IConversationService _conversationService;

    public MessageService(IUserService userService, IConversationService conversationService)
    {
        _userService = userService;
        _conversationService = conversationService;
    }

    public async Task<Message> CreateMessage(Message message, int recipientId)
    {
        var currentUserId = _userService.GetCurrentUserId();
        if (string.IsNullOrEmpty(message.Content))
        {
            throw new InvalidMessageException();
        }

        var conversation = await _conversationService.EnsureConversationExists(currentUserId, recipientId);
        message.ConversationId = conversation.Id;
        message.Conversation = conversation;
        message.SenderId = currentUserId;
        message.IsRead = false;
        message.SentAt = DateTime.UtcNow;

        return message;
    }

}