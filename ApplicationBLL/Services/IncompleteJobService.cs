using ApplicationBLL.Logic;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;

namespace ApplicationBLL.Services;

public class IncompleteJobService : IIncompleteJobService
{
    private readonly IIncompleteJobQueryRepository _incompleteJobQueryRepository;
    private readonly IEmployerQueryRepository _employerQueryRepository;
    private readonly IUserService _userService;

    public IncompleteJobService(IUserService userService,
        IEmployerQueryRepository employerQueryRepository,
        IIncompleteJobQueryRepository incompleteJobQueryRepository)
    {
        _userService = userService;
        _employerQueryRepository = employerQueryRepository;
        _incompleteJobQueryRepository = incompleteJobQueryRepository;
    }

    public async Task<IncompleteJob> StartIncompleteJobCreation(IncompleteJob incompleteJob)
    {
        var employer = await _employerQueryRepository.GetEmployer(_userService.GetCurrentUserId());
        if (incompleteJob.Salary != null && !incompleteJob.Salary.MeetsMinSalaryRequirement)
        {
            if (!SalaryRateHelper.CheckMinimalSalary(incompleteJob.Salary.MinimalAmount, incompleteJob.Salary.SalaryRate))
                throw new InvalidJobException("Salary wage appears to be below the minimum wage for this location");
        }
        incompleteJob.EmployerId = employer.Id;
        return incompleteJob;
    }

    public async Task<IncompleteJob> UpdateIncompleteJob(int incompleteJobId, IncompleteJob updatedIncompleteJob)
    {
        CheckIfValidSalaryProvided(updatedIncompleteJob.Salary);
        
        var incompleteJobEntity = await _incompleteJobQueryRepository.GetIncompleteJobWithEmployer(incompleteJobId);
        CheckIfUserHasAccessToPerformAnAction(incompleteJobEntity);

        var locationChangeNeeded = false;
        
        if (!string.IsNullOrEmpty(updatedIncompleteJob.LocationCountry) && incompleteJobEntity.LocationCountry != updatedIncompleteJob.LocationCountry &&
            (incompleteJobEntity.Location == updatedIncompleteJob.Location || string.IsNullOrEmpty(updatedIncompleteJob.Location)))
        {
            locationChangeNeeded = true;
        }

        var updatedEntity = EntitiesUpdateManager<IncompleteJob>
            .UpdateEntityProperties(incompleteJobEntity, updatedIncompleteJob);
        
        
        if (incompleteJobEntity.Salary == null)
        {
            updatedEntity.Salary = updatedIncompleteJob.Salary;
        }
        else if (updatedIncompleteJob.Salary != null)
        {
            var updatedSalary = EntitiesUpdateManager<IncompleteJobSalary>.UpdateEntityProperties(updatedEntity.Salary,
                updatedIncompleteJob.Salary);
            updatedEntity.Salary = updatedSalary;
        }

        updatedEntity.Location = locationChangeNeeded ? "" : updatedEntity.Location;
        
        return updatedEntity;
    }

    public async Task<IncompleteJob> UpdateIncompleteJobSalary(int incompleteJobId, IncompleteJobSalary? incompleteJobSalary)
    {
        CheckIfValidSalaryProvided(incompleteJobSalary);
        var incompleteJobEntity = await _incompleteJobQueryRepository.GetIncompleteJobWithEmployer(incompleteJobId);
        CheckIfUserHasAccessToPerformAnAction(incompleteJobEntity);
        incompleteJobEntity.Salary = incompleteJobSalary;
        return incompleteJobEntity;
    }


    public async Task<IncompleteJob> DeleteIncompleteJob(int incompleteJobId)
    {
        var incompleteJobEntity = await _incompleteJobQueryRepository.GetIncompleteJobWithEmployer(incompleteJobId);
        CheckIfUserHasAccessToPerformAnAction(incompleteJobEntity);


        return incompleteJobEntity;
    }

    private void CheckIfValidSalaryProvided(IncompleteJobSalary? salary)
    {
        Console.WriteLine(salary);
        if (salary != null && !salary.MeetsMinSalaryRequirement)
        {
            if (!SalaryRateHelper.CheckMinimalSalary(salary.MinimalAmount, salary.SalaryRate))
                throw new InvalidJobException("This wage appears to be below the minimum wage for this location");
        }
    }

    private void CheckIfUserHasAccessToPerformAnAction(IncompleteJob incompleteJob)
    {
        if (incompleteJob.Employer.UserId != _userService.GetCurrentUserId()) throw new ForbiddenException();
    }
}