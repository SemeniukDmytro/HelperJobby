using ApplicationBLL.Interfaces;
using ApplicationDomain.Absraction.ICommandRepositories;
using ApplicationDomain.Absraction.IQueryRepositories;
using ApplicationDomain.Absraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;

namespace ApplicationBLL.Services.UserService;

public class UserService : IUserService
{
    private IUserIdGetter _userIdGetter;
    private IPasswordHandler _passwordHandler;
    private readonly IUserQueryRepository _userQueryRepository;

    public UserService(IUserIdGetter userIdGetter, IUserQueryRepository userQueryRepository, IPasswordHandler passwordHandler)
    {
        _userIdGetter = userIdGetter;
        _userQueryRepository = userQueryRepository;
        _passwordHandler = passwordHandler;
    }
    public int GetCurrentUserId()
    {
        return _userIdGetter.CurrentId;
    }

    public async Task<User> CreateUser(User registerUser)
    {
        if (!await _userQueryRepository.IsEmailAvailable(registerUser.Email))
        {
            throw new EmailIsNotAvailable();
        }
        registerUser.PasswordHash = BCrypt.Net.BCrypt.HashPassword(registerUser.PasswordHash);
        registerUser.EmployerAccount = new EmployerAccount();
        registerUser.JobSeekerAccount = new JobSeekerAccount();

        return registerUser;
    }

    public async Task<User> UpdateUser(int id, User updatedUser)
    {
        var userEntity = await _userQueryRepository.GetUserByIdPlain(id);
        if (updatedUser.Email != userEntity.Email)
        {
            if (!await _userQueryRepository.IsEmailAvailable(updatedUser.Email))
            {
                throw new EmailIsNotAvailable();
            }
            userEntity.Email = updatedUser.Email;
        }

        if (!_passwordHandler.Verify(updatedUser.PasswordHash, userEntity.PasswordHash))
        {
            userEntity.PasswordHash = _passwordHandler.ChangePassword(updatedUser.PasswordHash);
        }

        if (userEntity.AccountType != updatedUser.AccountType)
        {
            userEntity.AccountType = updatedUser.AccountType;
        }
        return userEntity;
    }
}