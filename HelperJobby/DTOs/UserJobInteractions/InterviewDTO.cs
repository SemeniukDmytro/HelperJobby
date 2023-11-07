using HelperJobby.DTOs.Account;
using HelperJobby.DTOs.Job;

namespace HelperJobby.DTOs.UserJobInteractions;

public class InterviewDTO
{
    public int JobId { get; set; }
    
    public int JobSeekerAccountId { get; set; }
    
    public JobDTO Job { get; set; }
    
    public JobSeekerAccountDTO JobSeekerAccount { get; set; }
    
    public DateTime DateTimeOfInterview { get; set; }
}