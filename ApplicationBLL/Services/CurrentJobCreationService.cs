using ApplicationDomain.Absraction.IQueryRepositories;
using ApplicationDomain.Absraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;

namespace ApplicationBLL.Services;

public class CurrentJobCreationService : ICurrentJobCreationService
{
    private readonly IUserService _userService;
    private readonly IEmployerAccountQueryRepository _employerAccountQueryRepository;
    private readonly ICurrentJobCreationQueryRepository _currentJobCreationQueryRepository;

    public CurrentJobCreationService(IUserService userService, IEmployerAccountQueryRepository employerAccountQueryRepository, ICurrentJobCreationQueryRepository currentJobCreationQueryRepository)
    {
        _userService = userService;
        _employerAccountQueryRepository = employerAccountQueryRepository;
        _currentJobCreationQueryRepository = currentJobCreationQueryRepository;
    }

    public async Task<CurrentJobCreation> StartJobCreation(CurrentJobCreation currentJobCreation)
    {
        var employerAccount =
            await _employerAccountQueryRepository.GetEmployerAccountWithCurrentJobCreation(
                _userService.GetCurrentUserId());
        if (employerAccount.CurrentJobCreation != null)
        {
            throw new ForbiddenException("Current employer already started job creation");
        }
        currentJobCreation.EmployerAccountId = employerAccount.Id;
        return currentJobCreation;
    }

    public Task<CurrentJobCreation> UpdateCurrentJob(int jobId, int employerId, CurrentJobCreation currentJobCreation)
    {
        throw new NotImplementedException();
    }

    public Task<CurrentJobCreation> DeleteCurrenJob(int jobId, int employerId)
    {
        throw new NotImplementedException();
    }
}