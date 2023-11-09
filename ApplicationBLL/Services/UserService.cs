using ApplicationBLL.Interfaces;
using ApplicationDomain.Absraction.IQueryRepositories;
using ApplicationDomain.Absraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;

namespace ApplicationBLL.Services;

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
        if (GetCurrentUserId() != id)
        {
            throw new Exception("Invalid user");
        }
        var userEntity = await _userQueryRepository.GetUserByIdPlain(id);
        if (!string.IsNullOrEmpty(updatedUser.Email) && updatedUser.Email != userEntity.Email)
        {
            if ( !await _userQueryRepository.IsEmailAvailable(updatedUser.Email))
            {
                throw new EmailIsNotAvailable();
            }
            userEntity.Email = updatedUser.Email;
        }

        if (!string.IsNullOrEmpty(updatedUser.PasswordHash) && !_passwordHandler.Verify(updatedUser.PasswordHash, userEntity.PasswordHash))
        {
            userEntity.PasswordHash = _passwordHandler.ChangePassword(updatedUser.PasswordHash);
        }

        if (!string.IsNullOrEmpty(updatedUser.AccountType) && userEntity.AccountType != updatedUser.AccountType)
        {
            userEntity.AccountType = updatedUser.AccountType;
        }
        return userEntity;
    }
}