﻿using ApplicationDomain.Abstraction.ICommandRepositories;
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
        await _messageCommandRepository.CreateMessage(createdMessage);
        var messageDTO = _mapper.Map<MessageDTO>(createdMessage);
        
        await Clients.User(jobSeekerId.ToString()).SendAsync("ReceiveMessage", messageDTO, employerId, conversationId.Value);
        await Clients.User(jobSeekerId.ToString()).SendAsync("UpdateConversations", messageDTO);
        await Clients.Caller.SendAsync("MessageSent", messageDTO, conversationId);
        await Clients.Caller.SendAsync("UpdateConversations", messageDTO);
    }
    
    public async Task SendMessageToEmployer(int employerId, string message, int jobId, int? conversationId)
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
        await _messageCommandRepository.CreateMessage(createdMessage);
        
        await Clients.User(employerId.ToString()).SendAsync("ReceiveMessage", _mapper.Map<MessageDTO>(createdMessage), jobSeekerId, conversationId.Value );
        await Clients.Caller.SendAsync("MessageSent", _mapper.Map<MessageDTO>(createdMessage), conversationId.Value);
        
    }
    
    public async Task ReadMessageFromJobSeeker(int messageId, int jobSeekerId)
    {
        var senderId = Context.User.Claims.FirstOrDefault(c => c.Type == "employerId")?.Value;
        if (string.IsNullOrEmpty(senderId) || !int.TryParse(senderId, out var employerId))
        {
            throw new UnauthorizedException();
        }

        var readMessage = await _messageService.ReadMessage(messageId, jobSeekerId, employerId);
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