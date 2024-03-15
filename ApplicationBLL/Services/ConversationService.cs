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

    public async Task<Conversation?> GetCandidatePotentialConversation(int candidateId, int jobId)
    {
        var currentEmployerId = _employerService.GetCurrentEmployerId();
        
        var conversation =
            await _conversationQueryRepository.GetConversationFullInfoByJobSeekerAndEmployerJobIds(candidateId, currentEmployerId, jobId);

        if (conversation == null)
        {
            var jobApply = await _jobApplyQueryRepository.GetJobApplyByJobIdAndJobSeekerId(jobId, candidateId);
            
            if (jobApply.Job.EmployerId != currentEmployerId)
            {
                throw new ForbiddenException("The job posting was created by another employer");
            }
        }

        return conversation;

    }

    public async Task<Conversation> EnsureConversationExists(int employerId, int jobSeekerId, int jobId)
    {
        var conversation =
            await _conversationQueryRepository.GetConversationPlainByJobSeekerAndEmployerJobIds(jobSeekerId, employerId,
                jobId);

        if (conversation == null)
        {
            var jobApply = await _jobApplyQueryRepository.GetJobApplyForConversation(jobSeekerId, jobId);
            
            if (jobApply.Job.EmployerId != employerId)
            {
                throw new ForbiddenException("The job posting was created by another employer");
            }
            
            conversation = new Conversation
            {
                EmployerId = employerId,
                JobSeekerId = jobSeekerId,
                JobId = jobId,
                LastModified = DateTime.UtcNow,
                Messages = new List<Message>()
            };

            conversation = await _conversationCommandRepository.CreateConversation(conversation);
            conversation.Employer = jobApply.Job.Employer;
            conversation.JobSeeker = jobApply.JobSeeker;
            conversation.Job = jobApply.Job;
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