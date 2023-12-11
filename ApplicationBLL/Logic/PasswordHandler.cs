using ApplicationBLL.Interfaces;

namespace ApplicationBLL.Logic;

public class PasswordHandler : IPasswordHandler
{
    public bool Verify(string password, string actualPassword)
    {
        return BCrypt.Net.BCrypt.Verify(password, actualPassword);
    }

    public string ChangePassword(string password)
    {
        return BCrypt.Net.BCrypt.HashPassword(password);
    }
}