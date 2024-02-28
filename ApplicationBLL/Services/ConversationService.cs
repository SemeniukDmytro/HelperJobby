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
    private readonly IJobApplyQueryRepository _jobApplyQueryRepository;
    private readonly IJobSeekerService _jobSeekerService;
    private readonly IEmployerService _employerService;

    public ConversationService(IConversationQueryRepository conversationQueryRepository, IConversationCommandRepository conversationCommandRepository,
        IJobApplyQueryRepository jobApplyQueryRepository, IEmployerService employerService, IJobSeekerService jobSeekerService)
    {
        _conversationQueryRepository = conversationQueryRepository;
        _conversationCommandRepository = conversationCommandRepository;
        _jobApplyQueryRepository = jobApplyQueryRepository;
        _employerService = employerService;
        _jobSeekerService = jobSeekerService;
    }

    public async Task<IEnumerable<Conversation>> GetEmployerConversationsByJobId(int jobId)
    {
        var employerId = _employerService.GetCurrentEmployerId();
        var conversations = (await _conversationQueryRepository.GetConversationsByJobIdAndEmployerId(jobId, employerId)).ToList();
        return conversations;
    }

    public async Task<IEnumerable<Conversation>> GetJobSeekerConversationsByJobId(int jobId)
    {
        var jobSeekerId = _jobSeekerService.GetCurrentJobSeekerId();
        var conversations = (await _conversationQueryRepository.GetConversationsByJobIdAndJobSeekerId(jobId, jobSeekerId)).ToList();
        return conversations;
    }

    public async Task<IEnumerable<Conversation>> GetCurrentEmployerConversations()
    {
        var employerId = _employerService.GetCurrentEmployerId();
        var conversations = (await _conversationQueryRepository.GetConversationsByEmployerId(employerId)).ToList();

        return conversations;
    }

    public async Task<IEnumerable<Conversation>> GetCurrentJobSeekerConversations()
    {
        var jobSeekerId = _jobSeekerService.GetCurrentJobSeekerId();
        var conversations = (await _conversationQueryRepository.GetConversationsByJobSeekerId(jobSeekerId)).ToList();

        return conversations;
    }

    public async Task<Conversation> GetConversationFullInfo(int conversationId)
    {
        var conversation = await _conversationQueryRepository.GetConversationWithAllInfo(conversationId);
        CheckIfUserHavePermissionToRetrieveConversationInfo(conversation);
        return conversation;

    }

    public async Task<Conversation> EnsureConversationExists(int employerId, int jobSeekerId, int jobId)
    {
        if (employerId == jobSeekerId)
        {
            throw new ForbiddenException("You can not text with yourself");
        }
        

        var conversation =
            await _conversationQueryRepository.GetConversationByJobSeekerAndEmployerJobIds(jobSeekerId, employerId,
                jobId);

        if (conversation == null)
        {
            var jobApply = await _jobApplyQueryRepository.GetJobApplyByJobIdAndJobSeekerId(jobId, jobSeekerId);
            
            if (jobApply.Job.EmployerId != employerId)
            {
                throw new ForbiddenException("The job posting was created by another employer");
            }
            
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

    private void CheckIfUserHavePermissionToRetrieveConversationInfo(Conversation? conversation)
    {
        if (conversation == null)
        {
            throw new ConversationNotFoundException();
        }
        var currentEmployerId = _employerService.GetCurrentEmployerId();
        var currentJobSeekerId = _jobSeekerService.GetCurrentJobSeekerId();
        if (currentEmployerId != conversation.EmployerId && currentJobSeekerId != conversation.JobSeekerId)
        {
            throw new ForbiddenException("You can not retrieve this information");
        }
    }
}