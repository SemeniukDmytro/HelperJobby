using ApplicationCommon.DTOs.User;

namespace ApplicationBLL.QueryRepositories.Abstract.UserQueryRepository;

public interface IUserQueryRepository
{
    public Task<UserDTO> GetUserById(int id);
    public int GetCurrentUserId();
}