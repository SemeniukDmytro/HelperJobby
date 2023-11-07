using ApplicationBLL.Interfaces;
using ApplicationDomain.Absraction.ICommandRepositories;
using ApplicationDomain.Absraction.IQueryRepositories;
using ApplicationDomain.Absraction.IServices;
using ApplicationDomain.Models;

namespace ApplicationBLL.Services.UserService;

public class UserService : IUserService
{
    private IUserCommandRepository _userCommandRepository;
    private IUserIdGetter _userIdGetter;
    private readonly IUserQueryRepository _userQueryRepository;

    public UserService(IUserIdGetter userIdGetter, IUserCommandRepository userCommandRepository, IUserQueryRepository userQueryRepository)
    {
        _userIdGetter = userIdGetter;
        _userCommandRepository = userCommandRepository;
        _userQueryRepository = userQueryRepository;
    }
    public int GetCurrentUserId()
    {
        return _userIdGetter.CurrentId;
    }

    public async Task CreateUser(User registerUser)
    {
        if (!await _userQueryRepository.IsEmailAvailable(registerUser.Email))
        {
            throw new Exception("Email is already in use.");
        }
        registerUser.PasswordHash = BCrypt.Net.BCrypt.HashPassword(registerUser.PasswordHash);
        registerUser.EmployerAccount = new EmployerAccount();
        registerUser.JobSeekerAccount = new JobSeekerAccount();

        await _userCommandRepository.CreateUser(registerUser);
    }
}