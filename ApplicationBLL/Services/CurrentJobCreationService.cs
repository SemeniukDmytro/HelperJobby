using ApplicationBLL.Logic;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;

namespace ApplicationBLL.Services;

public class CurrentJobCreationService : ICurrentJobCreationService
{
    private readonly ICurrentJobCreationQueryRepository _currentJobCreationQueryRepository;
    private readonly IEmployerAccountQueryRepository _employerAccountQueryRepository;
    private readonly IUserService _userService;

    public CurrentJobCreationService(IUserService userService,
        IEmployerAccountQueryRepository employerAccountQueryRepository,
        ICurrentJobCreationQueryRepository currentJobCreationQueryRepository)
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
            throw new ForbiddenException("Current employer already started job creation");
        currentJobCreation.EmployerAccountId = employerAccount.Id;
        return currentJobCreation;
    }

    public async Task<CurrentJobCreation> UpdateCurrentJob(int jobId, CurrentJobCreation currentJobCreation)
    {
        var currentEmployer = await _employerAccountQueryRepository.GetEmployerAccount(_userService.GetCurrentUserId());
        var jobEntity = await _currentJobCreationQueryRepository.GetJobCreationById(jobId);

        if (jobEntity.EmployerAccountId != currentEmployer.Id) throw new ForbiddenException();

        var updatedEntity = JobUpdateValidation<CurrentJobCreation>.Update(jobEntity, currentJobCreation);
        return updatedEntity;
    }


    public async Task<CurrentJobCreation> DeleteCurrentJob(int jobId)
    {
        var currentEmployer = await _employerAccountQueryRepository.GetEmployerAccount(_userService.GetCurrentUserId());
        var job = await _currentJobCreationQueryRepository.GetJobCreationById(jobId);
        if (job.EmployerAccountId != currentEmployer.Id) throw new ForbiddenException();

        return job;
    }
}