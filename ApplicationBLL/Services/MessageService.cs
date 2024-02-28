using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.MessagingRelatedModels;

namespace ApplicationBLL.Services;

public class MessageService : IMessageService
{
    private readonly IJobSeekerService _jobSeekerService;
    private readonly IEmployerService _employerService;
    public MessageService(IJobSeekerService jobSeekerService, IEmployerService employerService)
    {
        _jobSeekerService = jobSeekerService;
        _employerService = employerService;
    }

    public async Task<Message> CreateJobSeekerMessage(string message, int jobSeekerId, int conversationId)
    {
        var currentJobSeekerId = _jobSeekerService.GetCurrentJobSeekerId();

        if (currentJobSeekerId != jobSeekerId)
        {
            throw new ForbiddenException();
        }
        
        var createdMessage = PopulateMessageEntityWithCommonInitialData(message, conversationId);
        createdMessage.EmployerId = jobSeekerId;

        return createdMessage;

    }

    public async Task<Message> CreateEmployerMessage(string message, int employerId, int conversationId)
    {
        var currentEmployerId = _employerService.GetCurrentEmployerId();

        if (currentEmployerId != employerId)
        {
            throw new ForbiddenException();
        }

        var createdMessage = PopulateMessageEntityWithCommonInitialData(message, conversationId);
        createdMessage.EmployerId = employerId;

        return createdMessage;
    }


    private Message PopulateMessageEntityWithCommonInitialData(string message, int conversationId)
    {
        if (string.IsNullOrEmpty(message))
        {
            throw new InvalidMessageException();
        }

        

        var messageEntity = new Message()
        {
            Content = message,
            ConversationId = conversationId,
            SentAt = DateTime.UtcNow,
            IsRead = false
        };

        return messageEntity;
    }
}