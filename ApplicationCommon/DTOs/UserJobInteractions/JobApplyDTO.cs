using ApplicationCommon.DTOs.Account;
using ApplicationCommon.DTOs.Job;

namespace ApplicationCommon.DTOs.UserJobInteractions;

public class JobApplyDTO
{
    public int JobId { get; set; }

    public int JobSeekerAccountId { get; set; }

    public JobDTO Job { get; set; }

    public JobSeekerAccountDTO JobSeekerAccount { get; set; }

    public DateTime DateTimeOfApply { get; set; }
}