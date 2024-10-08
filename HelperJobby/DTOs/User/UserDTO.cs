using HelperJobby.DTOs.Account;

namespace HelperJobby.DTOs.User;

public class UserDTO
{
    public int Id { get; set; }

    public string Email { get; set; }

    public string Password { get; set; }

    public string AccountType { get; set; }

    public JobSeekerDTO JobSeekerAccount { get; set; }

    public EmployerDTO? EmployerAccount { get; set; }
}