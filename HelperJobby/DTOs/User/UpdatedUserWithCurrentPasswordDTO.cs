namespace HelperJobby.DTOs.User;

public class UpdatedUserWithCurrentPasswordDTO
{
    public string Email { get; set; }
    
    public string Password { get; set; }
    
    public string AccountType { get; set; }
    
    public string CurrentPassword { get; set; }
}