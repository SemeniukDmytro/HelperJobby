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

    public async Task SendMessageToJobSeeker(int jobSeekerId, string message, int jobId, int? conversationId)
    {
        var senderId = Context.User.Claims.FirstOrDefault(c => c.Type == "employerId")?.Value;
        if (string.IsNullOrEmpty(senderId) || !int.TryParse(senderId, out var employerId))
        {
            throw new UnauthorizedException();
        }

        Conversation conversation = null;
        if (conversationId == null)
        {
            conversation = await _conversationService.EnsureConversationExists(employerId, jobSeekerId, jobId);
            conversationId = conversation.Id;
        }
        
        var createdMessage = await _messageService.CreateMessageToJobSeeker(message, employerId, conversationId.Value);
        createdMessage.Conversation = conversation;
        
        await Clients.User(jobSeekerId.ToString()).SendAsync("ReceiveMessage", createdMessage, employerId, conversationId.Value);
        await Clients.Caller.SendAsync("MessageSent", createdMessage, conversationId);
        
        await _messageCommandRepository.CreateMessage(createdMessage);
    }
    
    public async Task SendMessageToEmployer(int employerId, string message, int? conversationId, int jobId)
    {
        var senderId = Context.User.Claims.FirstOrDefault(c => c.Type == "jobSeekerId")?.Value;
        if (string.IsNullOrEmpty(senderId) || !int.TryParse(senderId, out var jobSeekerId))
        {
            throw new UnauthorizedException();
        }

        Conversation conversation = null;
        if (conversationId == null)
        {
            conversation = await _conversationService.EnsureConversationExists(jobSeekerId, employerId, jobId);
            conversationId = conversation.Id;
        }
        
        var createdMessage = await _messageService.CreateMessageToEmployer(message, jobSeekerId, conversationId.Value);
        createdMessage.Conversation = conversation;
        
        await Clients.User(employerId.ToString()).SendAsync("ReceiveMessage", createdMessage, jobSeekerId, conversationId.Value );
        await Clients.Caller.SendAsync("MessageSent", createdMessage, conversationId.Value);
        
        await _messageCommandRepository.CreateMessage(createdMessage);
    }
}