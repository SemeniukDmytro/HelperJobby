using ApplicationDomain.Abstraction.IServices;
using AutoMapper;
using HelperJobby.DTOs.Messaging;
using Microsoft.AspNetCore.Mvc;

namespace HelperJobby.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConversationController : ExtendedBaseController
    {
        private readonly IConversationService _conversationService;
        
        public ConversationController(IMapper mapper, IConversationService conversationService) : base(mapper)
        {
            _conversationService = conversationService;
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
        
    }
}
