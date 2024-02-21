using ApplicationDomain.Enums;

namespace HelperJobby.DTOs.UserJobInteractions;

public class UpdateJobApplyDTO
{
    public JobApplyStatuses JobApplyStatus { get; set; }
    public bool IsReviewed { get; set; }
}