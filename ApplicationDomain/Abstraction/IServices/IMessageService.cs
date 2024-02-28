using ApplicationDomain.MessagingRelatedModels;

namespace ApplicationDomain.Abstraction.IServices;

public interface IMessageService
{
    public Task<Message> CreateJobSeekerMessage(string message, int jobSeekerId, int conversationId);

    public Task<Message> CreateEmployerMessage(string message, int employerId, int conversationId);
}