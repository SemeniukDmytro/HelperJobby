using HelperJobby.DTOs.Account;

namespace HelperJobby.DTOs.Organization;

public class OrganizationDTO
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string PhoneNumber { get; set; }
    public EmployerAccountDTO EmployerAccount { get; set; }
}