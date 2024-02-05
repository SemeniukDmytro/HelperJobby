using HelperJobby.DTOs.Address;
using HelperJobby.DTOs.Resume;
using HelperJobby.DTOs.User;
using HelperJobby.DTOs.UserJobInteractions;

namespace HelperJobby.DTOs.Account;

public class JobSeekerDTO
{
    public int Id { get; set; }

    public string FirstName { get; set; }

    public string LastName { get; set; }
    public string PhoneNumber { get; set; }

    public int UserId { get; set; }

    public UserDTO User { get; set; }

    public int? AddressId { get; set; }
    public AddressDTO? Address { get; set; }
    public ResumeDTO? Resume { get; set; }
    public List<InterviewDTO> Interviews { get; set; }
    public List<JobApplyDTO> JobApplies { get; set; }
    public List<SavedJobDTO> SavedJobs { get; set; }
}