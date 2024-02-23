namespace ApplicationBLL.Interfaces;

public interface IUserIdSetter
{
    public int CurrentId { set; }
    public int CurrentJobSeekerId { set; }
    public int CurrentEmployerId { set; }
}