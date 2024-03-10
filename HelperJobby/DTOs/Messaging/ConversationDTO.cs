using HelperJobby.DTOs.Account;
using HelperJobby.DTOs.Job;

namespace HelperJobby.DTOs.Messaging;

public class ConversationDTO
{
    public int Id { get; set; }
    public DateTime LastModified { get; set; }
    public int EmployersUnreadMessagesCount { get; set; }
    public int JobSeekersUnreadMessagesCount { get; set; }
    public List<MessageDTO> Messages { get; set; }
    public int JobSeekerId { get; set; }
    public JobSeekerDTO JobSeeker { get; set; }
    public int EmployerId { get; set; }
    public EmployerDTO Employer { get; set; }
    public int JobId { get; set; }
    public JobDTO Job { get; set; }
   
}