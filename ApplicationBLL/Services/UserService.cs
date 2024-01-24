using ApplicationBLL.Interfaces;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
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
            throw new EmailIsNotAvailableException();
        }
        registerUser.PasswordHash = BCrypt.Net.BCrypt.HashPassword(registerUser.PasswordHash);
        registerUser.JobSeekerAccount = new JobSeekerAccount()
        {
            FirstName = "",
            LastName = "",
            PhoneNumber = ""
        };

        return registerUser;
    }

    public async Task<User> UpdateUser(int id, User updatedUser)
    {
        if (GetCurrentUserId() != id)
        {
            throw new Exception("Invalid user");
        }
        var userEntity = await _userQueryRepository.GetUserByIdPlain(id);

        if (!string.IsNullOrEmpty(updatedUser.AccountType) && userEntity.AccountType != updatedUser.AccountType)
        {
            userEntity.AccountType = updatedUser.AccountType;
        }
        return userEntity;
    }

    public async Task<User> UpdateUserVulnerableInfo(int userId, User updatedUser, string userPassword)
    {
        if (GetCurrentUserId() != userId)
        {
            throw new Exception("Invalid user");
        }
        var userEntity = await _userQueryRepository.GetUserByIdPlain(userId);
        if (!_passwordHandler.Verify(userPassword, userEntity.PasswordHash))
        {
            throw new UserNotFoundException("Password provided for specified email is wrong");
        }
        
        var updatedUserEntity = await UpdateUserInfo(updatedUser, userEntity);
        return updatedUserEntity;
    }

    private async Task<User> UpdateUserInfo(User updatedUser, User userEntity)
    {
        if (!string.IsNullOrEmpty(updatedUser.Email) && updatedUser.Email != userEntity.Email)
        {
            if ( !await _userQueryRepository.IsEmailAvailable(updatedUser.Email))
            {
                throw new EmailIsNotAvailableException();
            }
            userEntity.Email = updatedUser.Email;
        }

        if (!string.IsNullOrEmpty(updatedUser.PasswordHash) && userEntity.PasswordHash != updatedUser.PasswordHash)
        {
            userEntity.PasswordHash = _passwordHandler.ChangePassword(updatedUser.PasswordHash);
        }
        return userEntity;
    }
}