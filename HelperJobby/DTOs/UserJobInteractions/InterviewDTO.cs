using HelperJobby.DTOs.Account;
using HelperJobby.DTOs.Job;

namespace HelperJobby.DTOs.UserJobInteractions;

public class InterviewDTO
{
    public int JobId { get; set; }

    public int JobSeekerId { get; set; }

    public JobDTO Job { get; set; }

    public JobSeekerDTO JobSeeker { get; set; }

    public DateTime InterviewStart { get; set; }
    public TimeOnly InterviewEnd { get; set; }
    public string InterviewType { get; set; }
    public string AppointmentInfo { get; set; }
}