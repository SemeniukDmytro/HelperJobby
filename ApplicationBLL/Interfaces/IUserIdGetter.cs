namespace ApplicationBLL.Interfaces;

public interface IUserIdGetter
{
    public int CurrentId { get; }
    public int CurrentJobSeekerId { get; }
    public int CurrentEmployerId { get; }
}