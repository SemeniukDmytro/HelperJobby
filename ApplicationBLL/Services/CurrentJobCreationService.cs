using ApplicationDomain.Absraction.IQueryRepositories;
using ApplicationDomain.Absraction.IServices;
using ApplicationDomain.Attributes;
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

    public async Task<CurrentJobCreation> UpdateCurrentJob(int jobId, int employerAccountId, CurrentJobCreation currentJobCreation)
    {
        var jobEntity = await _currentJobCreationQueryRepository.GetJobCreationById(jobId, employerAccountId);
        
        if (jobEntity.EmployerAccountId != employerAccountId)
        {
            throw new ForbiddenException();
        }
        
        var entityProperties = jobEntity.GetType().GetProperties();
        var updatedJobProperties = currentJobCreation.GetType().GetProperties();

        foreach (var updatedProperty in updatedJobProperties)
        {
            if (Attribute.IsDefined(updatedProperty, typeof(ExcludeFromUpdateAttribute)))
            {
                continue;
            }
            
            var entityProperty = entityProperties.FirstOrDefault(p => p.Name == updatedProperty.Name);
            var test = updatedProperty.GetValue(currentJobCreation);
            if (test != null && (test != default || (int)test == default))
            {
                var currentValue = entityProperty.GetValue(jobEntity);
                var newValue = updatedProperty.GetValue(currentJobCreation);

                if (!Equals(currentValue, newValue) || currentValue == null || currentValue.Equals(default))
                {
                    entityProperty.SetValue(jobEntity, newValue);
                }
            }
        }

        return jobEntity;

    }
    

    public async Task<CurrentJobCreation> DeleteCurrenJob(int jobId, int employerAccountId)
    {
        var job = await _currentJobCreationQueryRepository.GetJobCreationById(jobId, employerAccountId);
        if (job.EmployerAccountId != employerAccountId)
        {
            throw new ForbiddenException();
        }

        return job;
    }
}