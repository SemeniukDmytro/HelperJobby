namespace HelperJobby.DTOs.Organization;

public class OrganizationEmployeeEmailDTO
{
    public OrganizationDTO Organization;
    public int Id { get; set; }
    public string Email { get; set; }
    public int OrganizationId { get; set; }
}