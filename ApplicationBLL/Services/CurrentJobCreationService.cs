using ApplicationDomain.Absraction.IQueryRepositories;
using ApplicationDomain.Absraction.IServices;
using ApplicationDomain.Models;

namespace ApplicationBLL.Services;

public class CurrentJobCreationService : ICurrentJobCreationService
{
    private readonly IUserService _userService;
    private readonly IEmployerAccountQueryRepository _employerAccountQueryRepository;

    public CurrentJobCreationService(IUserService userService, IEmployerAccountQueryRepository employerAccountQueryRepository)
    {
        _userService = userService;
        _employerAccountQueryRepository = employerAccountQueryRepository;
    }

    public Task StartJobCreation(CurrentJobCreation currentJobCreation)
    {
        throw new NotImplementedException();
    }

    public Task UpdateCurrentJob(int userId, CurrentJobCreation currentJobCreation)
    {
        throw new NotImplementedException();
    }

    public Task DeleteCurrenJob(int userId)
    {
        throw new NotImplementedException();
    }
}