using ApplicationDomain.Enums;
using HelperJobby.DTOs.Account;
using HelperJobby.DTOs.Job;

namespace HelperJobby.DTOs.UserJobInteractions;

public class JobApplyDTO
{
    public int JobId { get; set; }

    public int JobSeekerId { get; set; }
    public JobApplyStatuses JobApplyStatus { get; set; }
    public JobDTO Job { get; set; }

    public JobSeekerDTO JobSeeker { get; set; }

    public DateOnly DateApplied { get; set; }
}