namespace ApplicationBLL.Interfaces;

public interface ICurrentUserChecker
{
    public void IsCurrentUser(int userId);
}