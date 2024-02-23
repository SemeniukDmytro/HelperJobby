using ApplicationBLL.Interfaces;

namespace ApplicationBLL.Logic;

public class CurrentUserIdProvider : IUserIdSetter, IUserIdGetter
{
    private int _id;
    private int _jobSeekerId;
    private int _employerId;

    public int CurrentId
    {
        get => ValidateId(_id);
        set => _id = value;
    }

    public int CurrentJobSeekerId
    {
        get => ValidateId(_jobSeekerId);
        set => _jobSeekerId = value;
    }

    public int CurrentEmployerId
    {
        get => ValidateId(_employerId);
        set => _employerId = value;
    }

    private int ValidateId(int id)
    {
        if (id == 0) throw new Exception("No token passed");

        return id;
    }
}