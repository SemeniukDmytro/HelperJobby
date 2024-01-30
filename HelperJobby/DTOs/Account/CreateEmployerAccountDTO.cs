namespace HelperJobby.DTOs.Account;

public class CreateEmployerAccountDTO
{
    public string Email { get; set; }
    public string FullName { get; set; }

    public string ContactNumber { get; set; }

    public string OrganizationName { get; set; }

    public int? NumberOfEmployees { get; set; }
}