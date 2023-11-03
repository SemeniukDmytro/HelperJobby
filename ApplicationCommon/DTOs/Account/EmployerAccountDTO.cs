using ApplicationCommon.DTOs.Job;
using ApplicationCommon.DTOs.Organization;
using ApplicationCommon.DTOs.User;

namespace ApplicationCommon.DTOs.Account;

public class EmployerAccountDTO
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public UserDTO User { get; set; }
    public int OrganizationId { get; set; }
    public OrganizationDTO Organization { get; set; }
    public List<JobDTO> Jobs { get; set; }
}
