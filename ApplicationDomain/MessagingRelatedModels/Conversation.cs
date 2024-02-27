using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ApplicationDomain.Models;

namespace ApplicationDomain.MessagingRelatedModels;

public class Conversation
{
    public int Id { get; set; }
    [Required]
    public DateTime LastModified { get; set; }
    public List<Message> Messages { get; set; } 
    [Required]
    [ForeignKey("JobSeekerId")]
    public int JobSeekerId { get; set; }
    public JobSeeker JobSeeker { get; set; }
    [Required]
    [ForeignKey("EmployerId")]
    public int EmployerId { get; set; }
    public Employer Employer { get; set; }
    [Required]
    [ForeignKey("JobId")]
    public int JobId { get; set; }
    public Job Job { get; set; }
}