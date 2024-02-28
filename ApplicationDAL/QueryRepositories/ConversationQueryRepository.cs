using ApplicationDAL.Context;
using ApplicationDAL.Projections.MessagingProjections;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.MessagingRelatedModels;
using ApplicationDomain.Models;
using Microsoft.EntityFrameworkCore;

namespace ApplicationDAL.QueryRepositories;

public class ConversationQueryRepository : IConversationQueryRepository
{
    private readonly ApplicationContext _applicationContext;

    public ConversationQueryRepository(ApplicationContext applicationContext)
    {
        _applicationContext = applicationContext;
    }

    public async Task<Conversation?> GetConversationByJobSeekerAndEmployerJobIds(int jobSeekerId, int employerId, int jobId)
    {
        var conversation = await _applicationContext.Conversations.Where(c => c.JobSeekerId == jobSeekerId &&
                                                                              c.EmployerId == employerId && c.JobId == jobId)
            .FirstOrDefaultAsync();
        return conversation;
    }

    public async Task<IEnumerable<Conversation>> GetConversationsByJobIdAndEmployerId(int jobId, int employerId)
    {
        var conversations = await _applicationContext.Conversations.Where(c => c.JobId == jobId && c.EmployerId == employerId)
            .Select(ConversationProjections.ShortConversationInfo()).ToListAsync();

        return conversations;
    }

    public async Task<IEnumerable<Conversation>> GetConversationsByJobIdAndJobSeekerId(int jobId, int jobSeekerId)
    {
        var conversations = await _applicationContext.Conversations.Where(c => c.JobId == jobId && c.JobSeekerId == jobSeekerId)
            .Select(ConversationProjections.ShortConversationInfo()).ToListAsync();

        return conversations;
    }
    
    public async Task<IEnumerable<Conversation>> GetConversationsByEmployerId(int employerId)
    {
        var conversations = await _applicationContext.Conversations.Where(c => c.EmployerId == employerId)
            .Select(ConversationProjections.ShortConversationInfo()).ToListAsync();

        return conversations;
    }

    public async Task<IEnumerable<Conversation>> GetConversationsByJobSeekerId(int jobSeekerId)
    {
        var conversations = await _applicationContext.Conversations.Where(c => c.JobSeekerId == jobSeekerId)
            .Select(ConversationProjections.ShortConversationInfo()).ToListAsync();

        return conversations;
    }

    public async Task<Conversation?> GetConversationWithAllInfo(int conversationId)
    {
        var conversation = await _applicationContext.Conversations.Select(c => new Conversation()
        {
            Id = c.Id,
            LastModified = c.LastModified,
            Messages = c.Messages,
            Employer = new Employer()
            {
                Id = c.Employer.Id,
                FullName = c.Employer.FullName,
                Organization = new Organization()
                {
                    Id = c.Employer.Organization.Id,
                    Name = c.Employer.Organization.Name
                }
            },
            JobSeeker =
            {
                Id = c.JobSeeker.Id,
                FirstName = c.JobSeeker.FirstName,
                LastName = c.JobSeeker.LastName,
            },
            Job = c.Job
        }).FirstOrDefaultAsync(c => c.Id == conversationId);

        return conversation;
    }
}