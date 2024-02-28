using ApplicationDomain.Abstraction.ICommandRepositories;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.MessagingRelatedModels;

namespace ApplicationBLL.Services;

public class ConversationService : IConversationService
{
    private readonly IConversationQueryRepository _conversationQueryRepository;
    private readonly IConversationCommandRepository _conversationCommandRepository;

    public ConversationService(IConversationQueryRepository conversationQueryRepository, IConversationCommandRepository conversationCommandRepository)
    {
        _conversationQueryRepository = conversationQueryRepository;
        _conversationCommandRepository = conversationCommandRepository;
    }

    public async Task<Conversation> EnsureConversationExists(int employerId, int jobSeekerId, int jobId)
    {

        var conversation =
            await _conversationQueryRepository.GetConversationByJobSeekerAndEmployerJobIds(jobSeekerId, employerId,
                jobId);

        if (conversation == null)
        {
            conversation = new Conversation
            {
                EmployerId = employerId,
                JobSeekerId = employerId,
                JobId = jobId,
                LastModified = DateTime.UtcNow,
                Messages = new List<Message>()
            };

            conversation = await _conversationCommandRepository.CreateConversation(conversation);
        }

        return conversation;

    }
}