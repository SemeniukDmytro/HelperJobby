using ApplicationDomain.Abstraction.ICommandRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.MessagingRelatedModels;
using AutoMapper;
using HelperJobby.DTOs.Messaging;
using Microsoft.AspNetCore.SignalR;

namespace HelperJobby.Hubs;

public class ChatHub : Hub
{
    private readonly IMessageService _messageService;
    private readonly IMessageCommandRepository _messageCommandRepository;
    private readonly IConversationService _conversationService;
    private readonly IMapper _mapper;

    public ChatHub(IMessageService messageService, IMessageCommandRepository messageCommandRepository,
        IConversationService conversationService, IMapper mapper)
    {
        _messageService = messageService;
        _messageCommandRepository = messageCommandRepository;
        _conversationService = conversationService;
        _mapper = mapper;
    }

    public async Task SendMessageToJobSeeker(int jobSeekerId, string message, int jobId, ConversationDTO? conversationDTO)
    {
        var senderId = Context.User.Claims.FirstOrDefault(c => c.Type == "employerId")?.Value;
        if (string.IsNullOrEmpty(senderId) || !int.TryParse(senderId, out var employerId))
        {
            throw new UnauthorizedException();
        }

        var conversation = _mapper.Map<Conversation>(conversationDTO);
        if (conversation == null)
        {
            conversation = await _conversationService.EnsureConversationExists(jobSeekerId, employerId, jobId);
        }
        
        var createdMessage = await _messageService.CreateMessageToJobSeeker(message, employerId, conversation);
        createdMessage = await _messageCommandRepository.CreateMessage(createdMessage);
        var messageDTO = _mapper.Map<MessageDTO>(createdMessage);
        
        await Clients.User(jobSeekerId.ToString()).SendAsync("ReceiveMessage", messageDTO, employerId);
        await Clients.User(jobSeekerId.ToString()).SendAsync("UpdateConversations", messageDTO);
        await Clients.Caller.SendAsync("MessageSent", messageDTO);
        await Clients.Caller.SendAsync("UpdateConversations", messageDTO);
    }
    
    public async Task SendMessageToEmployer(int employerId, string message, int jobId, ConversationDTO? conversationDTO)
    {
        var senderId = Context.User.Claims.FirstOrDefault(c => c.Type == "jobSeekerId")?.Value;
        if (string.IsNullOrEmpty(senderId) || !int.TryParse(senderId, out var jobSeekerId))
        {
            throw new UnauthorizedException();
        }

        var conversation = _mapper.Map<Conversation>(conversationDTO);
        if (conversation == null)
        {
            conversation = await _conversationService.EnsureConversationExists(jobSeekerId, employerId, jobId);
        }
        
        var createdMessage = await _messageService.CreateMessageToEmployer(message, jobSeekerId, conversation);
        createdMessage = await _messageCommandRepository.CreateMessage(createdMessage);
        var messageDTO = _mapper.Map<MessageDTO>(createdMessage);
        
        await Clients.User(employerId.ToString()).SendAsync("ReceiveMessage", messageDTO, jobSeekerId);
        await Clients.User(employerId.ToString()).SendAsync("UpdateConversations", messageDTO);
        await Clients.Caller.SendAsync("MessageSent", messageDTO);
        await Clients.Caller.SendAsync("UpdateConversations", messageDTO);
    }
    
    public async Task ReadMessageFromJobSeeker(int messageId, int jobSeekerId)
    {
        var senderId = Context.User.Claims.FirstOrDefault(c => c.Type == "employerId")?.Value;
        if (string.IsNullOrEmpty(senderId) || !int.TryParse(senderId, out var employerId))
        {
            throw new UnauthorizedException();
        }

        var readMessage = await _messageService.ReadMessage(messageId, employerId, jobSeekerId);
        readMessage = await _messageCommandRepository.UpdateMessage(readMessage);

        await Clients.User(jobSeekerId.ToString()).SendAsync("MessageRead", _mapper.Map<MessageDTO>(readMessage));
    }
    
    public async Task ReadMessageFromEmployer(int messageId, int employerId)
    {
        var senderId = Context.User.Claims.FirstOrDefault(c => c.Type == "employerId")?.Value;
        if (string.IsNullOrEmpty(senderId) || !int.TryParse(senderId, out var jobSeekerId))
        {
            throw new UnauthorizedException();
        }

        var readMessage = await _messageService.ReadMessage(messageId, employerId, jobSeekerId);
        readMessage = await _messageCommandRepository.UpdateMessage(readMessage);

        await Clients.User(employerId.ToString()).SendAsync("MessageRead", _mapper.Map<MessageDTO>(readMessage));
    }
}