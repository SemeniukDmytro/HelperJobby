using ApplicationDomain.Abstraction.IServices;
using AutoMapper;
using HelperJobby.DTOs.Messaging;
using HelperJobby.DTOs.UserJobInteractions;
using Microsoft.AspNetCore.Mvc;

namespace HelperJobby.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ConversationController : ExtendedBaseController
{
    private readonly IConversationService _conversationService;
    private readonly IJobApplyService _jobApplyService;

    public ConversationController(IMapper mapper, IConversationService conversationService,
        IJobApplyService jobApplyService) : base(mapper)
    {
        _conversationService = conversationService;
        _jobApplyService = jobApplyService;
    }


    [HttpGet("employer-job-conversations/{jobId}")]
    public async Task<IEnumerable<ConversationDTO>> GetEmployerConversationByJobId(int jobId)
    {
        var conversations = await _conversationService.GetEmployerConversationsByJobId(jobId);
        return _mapper.Map<IEnumerable<ConversationDTO>>(conversations);
    }

    [HttpGet("employer/my-conversations")]
    public async Task<IEnumerable<ConversationDTO>> GetCurrentEmployerConversations()
    {
        var conversations = await _conversationService.GetCurrentEmployerConversations();
        return _mapper.Map<IEnumerable<ConversationDTO>>(conversations);
    }

    [HttpGet("jobSeeker/my-conversations")]
    public async Task<IEnumerable<ConversationDTO>> GetCurrentJobSeekerConversations()
    {
        var conversations = await _conversationService.GetCurrentJobSeekerConversations();
        return _mapper.Map<IEnumerable<ConversationDTO>>(conversations);
    }

    [HttpGet("{conversationId}")]
    public async Task<ConversationDTO> GetConversationById(int conversationId)
    {
        var conversation = await _conversationService.GetConversationFullInfo(conversationId);
        return _mapper.Map<ConversationDTO>(conversation);
    }

    [HttpGet("candidate-conversation/{candidateId}/{jobId}")]
    public async Task<ConversationDTO?> GetCandidatePotentialConversation(int candidateId, int jobId)
    {
        var conversation = await _conversationService.GetCandidatePotentialConversation(candidateId, jobId);
        Console.WriteLine(conversation);
        return _mapper.Map<ConversationDTO>(conversation);
    }

    [HttpGet("candidate/{jobSeekerId}/job/{jobId}")]
    public async Task<JobApplyDTO> GetJobApplyForConversation(int jobSeekerId, int jobId)
    {
        var jobApply = await _jobApplyService.GetJobApplyForConversation(jobSeekerId, jobId);
        return _mapper.Map<JobApplyDTO>(jobApply);
    }
}