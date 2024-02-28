using ApplicationDomain.Abstraction.ICommandRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.MessagingRelatedModels;
using Microsoft.AspNetCore.SignalR;

namespace HelperJobby.Hubs;

public class ChatHub : Hub
{
    private readonly IMessageService _messageService;
    private readonly IMessageCommandRepository _messageCommandRepository;
    private readonly IConversationService _conversationService;

    public ChatHub(IMessageService messageService, IMessageCommandRepository messageCommandRepository,
        IConversationService conversationService)
    {
        _messageService = messageService;
        _messageCommandRepository = messageCommandRepository;
        _conversationService = conversationService;
    }
    
    public async Task SendMessage(int recipientId, string message, int? conversationId, int jobId)
    {
        var senderId = Context.User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;
        var userId = 0;
        if (string.IsNullOrEmpty(senderId) || !int.TryParse(senderId, out userId))
        {
            throw new UnauthorizedException();
        }

        Conversation conversation = null;
        if (conversationId == null)
        {
            conversation = await _conversationService.EnsureConversationExists(userId, recipientId, jobId);
            conversationId = conversation.Id;
        }
        
        
        await Clients.User(recipientId.ToString()).SendAsync("ReceiveMessage", message, conversationId, senderId);
        await Clients.Caller.SendAsync("ReceiveMessage", message, conversationId);
        
        var createdMessage = await _messageService.CreateJobSeekerMessage(message, userId, conversationId.Value);
        createdMessage = await _messageCommandRepository.CreateMessage(createdMessage);
    }
}