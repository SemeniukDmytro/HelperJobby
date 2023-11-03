namespace ApplicationCommon.DTOs.User;

public class AuthUserDTO
{
    public UserDTO User { get; set; }
    
    public string Token { get; set; }
}