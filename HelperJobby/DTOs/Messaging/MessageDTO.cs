using ApplicationDomain.MessagingRelatedModels;
using ApplicationDomain.Models;

namespace HelperJobby.DTOs.Messaging;

public class MessageDTO
{
    public int Id { get; set; }
    public string Content { get; set; }
    public DateTime SentAt { get; set; }
    public bool IsRead { get; set; }
    public int? JobSeekerId { get; set; }
    public JobSeeker? JobSeeker { get; set; }
    public int? EmployerId { get; set; }
    public Employer? Employer { get; set; }
    public int ConversationId { get; set; }
    public Conversation Conversation { get; set; }
}