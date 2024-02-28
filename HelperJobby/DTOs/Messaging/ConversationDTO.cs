using ApplicationDomain.Models;

namespace HelperJobby.DTOs.Messaging;

public class ConversationDTO
{
    public int Id { get; set; }
    public DateTime LastModified { get; set; }
    public List<MessageDTO> Messages { get; set; }
    public int JobSeekerId { get; set; }
    public JobSeeker JobSeeker { get; set; }
    public int EmployerId { get; set; }
    public Employer Employer { get; set; }
    public int JobId { get; set; }
    public ApplicationDomain.Models.Job Job { get; set; }
   
}