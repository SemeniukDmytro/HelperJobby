using ApplicationBLL.Interfaces;
using ApplicationDomain.Absraction.IServices;
using ApplicationDomain.Exceptions;

namespace ApplicationBLL.Logic;

public class CurrentUserChecker : ICurrentUserChecker
{
    private readonly IUserService _userService;

    public CurrentUserChecker(IUserService userService)
    {
        _userService = userService;
    }

    public void IsCurrentUser(int userId)
    {
        var currentUserId = _userService.GetCurrentUserId();
        if (currentUserId != userId)
        {
            throw new ForbiddenException();
        }
    }
}