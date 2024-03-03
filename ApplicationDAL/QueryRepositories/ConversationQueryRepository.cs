using ApplicationDAL.Context;
using ApplicationDAL.Projections.MessagingProjections;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.MessagingRelatedModels;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace ApplicationDAL.QueryRepositories;

public class ConversationQueryRepository : IConversationQueryRepository
{
    private readonly ApplicationContext _applicationContext;
    private readonly IMapper _mapper;

    public ConversationQueryRepository(ApplicationContext applicationContext, IMapper mapper)
    {
        _applicationContext = applicationContext;
        _mapper = mapper;
    }

    public async Task<Conversation?> GetConversationPlainByJobSeekerAndEmployerJobIds(int jobSeekerId, int employerId,
        int jobId)
    {
        var conversation = await _applicationContext.Conversations.Where(c => c.JobSeekerId == jobSeekerId &&
                                                                              c.EmployerId == employerId &&
                                                                              c.JobId == jobId)
            .FirstOrDefaultAsync();
        return conversation;
    }

    public async Task<Conversation?> GetConversationFullInfoByJobSeekerAndEmployerJobIds(int jobSeekerId,
        int employerId, int jobId)
    {
        var conversation = await _applicationContext.Conversations.Where(c => c.JobSeekerId == jobSeekerId &&
                                                                              c.EmployerId == employerId &&
                                                                              c.JobId == jobId)
            .Select(ConversationProjections.FullConversationInfo()).FirstOrDefaultAsync();
        return conversation;
    }

    public async Task<IEnumerable<Conversation>> GetConversationsByJobIdAndEmployerId(int jobId, int employerId)
    {
        var conversations = await _applicationContext.Conversations
            .Where(c => c.JobId == jobId && c.EmployerId == employerId)
            .Select(ConversationProjections.ShortConversationInfo()).ToListAsync();
        
        return _mapper.Map<IEnumerable<Conversation>>(conversations);
    }

    public async Task<IEnumerable<Conversation>> GetConversationsByEmployerId(int employerId)
    {
        var conversations = await _applicationContext.Conversations.Where(c => c.EmployerId == employerId)
            .Select(ConversationProjections.ShortConversationInfo()).ToListAsync();
        return _mapper.Map<List<Conversation>>(conversations);    
    }

    public async Task<IEnumerable<Conversation>> GetConversationsByJobSeekerId(int jobSeekerId)
    {
        var conversations = await _applicationContext.Conversations.Where(c => c.JobSeekerId == jobSeekerId)
            .Select(ConversationProjections.ShortConversationInfo()).ToListAsync();

        return _mapper.Map<IEnumerable<Conversation>>(conversations);    }

    public async Task<Conversation?> GetConversationWithAllInfo(int conversationId)
    {
        var conversation = await _applicationContext.Conversations
            .Select(ConversationProjections.FullConversationInfo())
            .FirstOrDefaultAsync(c => c.Id == conversationId);

        return conversation;
    }
}