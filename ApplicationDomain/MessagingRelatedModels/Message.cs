using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ApplicationDomain.Models;

namespace ApplicationDomain.MessagingRelatedModels;

public class Message
{
    public int Id { get; set; }
    [Required]
    [MaxLength(2000)]
    public string Content { get; set; }
    [Required]
    public DateTime SentAt { get; set; }
    [Required]
    [DefaultValue(false)]
    public bool IsRead { get; set; }
    [ForeignKey("JobSeekerId")]
    public int? JobSeekerId { get; set; }
    public JobSeeker? JobSeeker { get; set; }
    [ForeignKey("EmployerId")]
    public int? EmployerId { get; set; }
    public Employer? Employer { get; set; }
    [Required]
    [ForeignKey("Conversation")]
    public int ConversationId { get; set; }
    public Conversation Conversation { get; set; }
}