namespace ApplicationBLL.Interfaces;

public interface IPasswordHandler
{
    public bool Verify(string password, string actualPassword);

    public string ChangePassword(string password);
}