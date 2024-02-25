using ApplicationDomain.Abstraction.ICommandRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.MessagingRelatedModels;
using AutoMapper;
using HelperJobby.DTOs.MessagingDTOs;
using Microsoft.AspNetCore.SignalR;

namespace HelperJobby.Hubs;

public class ChatHub : Hub
{
    private readonly IMessageService _messageService;
    private readonly IMessageCommandRepository _messageCommandRepository;
    private readonly IUserService _userService;
    private readonly IMapper _mapper;

    public ChatHub(IMessageService messageService, IMessageCommandRepository messageCommandRepository, IUserService userService, IMapper mapper)
    {
        _messageService = messageService;
        _messageCommandRepository = messageCommandRepository;
        _userService = userService;
        _mapper = mapper;
    }
    
    public async Task SendMessage(int recipientId, CreateMessageDTO createdMessageDTO)
    {
        var senderId = _userService.GetCurrentUserId();
        var message = await _messageService.CreateMessage(_mapper.Map<Message>(createdMessageDTO), recipientId);
        message = await _messageCommandRepository.CreateMessage(message);
        
        
        await Clients.User(recipientId.ToString()).SendAsync("ReceiveMessage", message, senderId);
    }
}