using ApplicationDomain.Enums;

namespace HelperJobby.DTOs.Job;

public class JobDetailsDTO
{
    public JobTypes JobType { get; set; }
    public Schedules Schedule { get; set; }
}