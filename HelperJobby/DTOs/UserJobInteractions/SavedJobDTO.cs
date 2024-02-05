using HelperJobby.DTOs.Account;
using HelperJobby.DTOs.Job;

namespace HelperJobby.DTOs.UserJobInteractions;

public class SavedJobDTO
{
    public int JobId { get; set; }

    public int JobSeekerId { get; set; }

    public JobDTO Job { get; set; }

    public JobSeekerDTO JobSeeker { get; set; }

    public DateOnly DateSaved { get; set; }
}