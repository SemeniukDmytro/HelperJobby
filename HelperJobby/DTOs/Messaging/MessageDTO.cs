using ApplicationDomain.MessagingRelatedModels;
using ApplicationDomain.Models;
using HelperJobby.DTOs.Account;

namespace HelperJobby.DTOs.Messaging;

public class MessageDTO
{
    public int Id { get; set; }
    public string Content { get; set; }
    public DateTime SentAt { get; set; }
    public bool IsRead { get; set; }
    public int? JobSeekerId { get; set; }
    public JobSeekerDTO? JobSeeker { get; set; }
    public int? EmployerId { get; set; }
    public EmployerDTO? Employer { get; set; }
    public int ConversationId { get; set; }
    public ConversationDTO Conversation { get; set; }
}