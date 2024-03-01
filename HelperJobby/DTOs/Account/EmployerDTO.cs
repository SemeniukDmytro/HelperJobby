using HelperJobby.DTOs.Job;
using HelperJobby.DTOs.Messaging;
using HelperJobby.DTOs.Organization;
using HelperJobby.DTOs.User;

namespace HelperJobby.DTOs.Account;

public class EmployerDTO
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string Email { get; set; }
    public string ContactNumber { get; set; }
    public int HasPostedFirstJob { get; set; }
    public string FullName { get; set; }
    public UserDTO User { get; set; }
    public int OrganizationId { get; set; }
    public OrganizationDTO Organization { get; set; }
    public List<JobDTO> Jobs { get; set; }
    public List<IncompleteJobDTO> IncompleteJobs { get; set; }
    public List<ConversationDTO> Conversations { get; set; }
}