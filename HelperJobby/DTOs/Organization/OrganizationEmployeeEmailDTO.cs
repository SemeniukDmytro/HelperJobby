namespace HelperJobby.DTOs.Organization;

public class OrganizationEmployeeEmailDTO
{
    public int Id { get; set; }
    public string Email { get; set; }
    public int OrganizationId { get; set; }
    public OrganizationDTO Organization { get; set; }
}
