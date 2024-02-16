using ApplicationBLL.Logic;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;

namespace ApplicationBLL.Services;

public class IncompleteJobService : IIncompleteJobService
{
    private readonly IIncompleteJobQueryRepository _incompleteJobQueryRepository;
    private readonly IEmployerService _employerService;

    public IncompleteJobService(IIncompleteJobQueryRepository incompleteJobQueryRepository,
        IEmployerService employerService)
    {
        _incompleteJobQueryRepository = incompleteJobQueryRepository;
        _employerService = employerService;
    }

    public async Task<IncompleteJob> GetIncompleteJobById(int incompleteJobId)
    {
        var incompleteJob = await _incompleteJobQueryRepository.GetIncompleteJobById(incompleteJobId);
        CheckIfEmployerHasAccessToPerformAnAction(incompleteJob);
        return incompleteJob;
    }

    public async Task<IEnumerable<IncompleteJob>> GetEmployerIncompleteJobs(int employerId)
    {
        var currentEmployerId = _employerService.GetCurrentEmployerId();
        if (employerId != currentEmployerId)
        {
            throw new ForbiddenException("You can not retrieve incomplete jobs of another person");
        }

        var incompleteJobs = (await _incompleteJobQueryRepository.GetIncompleteJobsByEmployerId(employerId)).ToList();
        return incompleteJobs;
    }

    public async Task<IncompleteJob> StartIncompleteJobCreation(IncompleteJob incompleteJob)
    {
        var currentEmployerId = _employerService.GetCurrentEmployerId();
        if (incompleteJob.Salary != null && !incompleteJob.Salary.MeetsMinSalaryRequirement)
        {
            if (!SalaryRateHelper.CheckMinimalSalary(incompleteJob.Salary.MinimalAmount,
                    incompleteJob.Salary.SalaryRate))
                throw new InvalidJobException("Salary wage appears to be below the minimum wage for this location");
        }

        incompleteJob.EmployerId = currentEmployerId;
        return incompleteJob;
    }

    public async Task<IncompleteJob> UpdateIncompleteJob(int incompleteJobId, IncompleteJob updatedIncompleteJob)
    {
        CheckIfValidSalaryProvided(updatedIncompleteJob.Salary);

        var incompleteJobEntity = await _incompleteJobQueryRepository.GetIncompleteJobById(incompleteJobId);
        CheckIfEmployerHasAccessToPerformAnAction(incompleteJobEntity);

        var locationChangeNeeded = false;

        if (!string.IsNullOrEmpty(updatedIncompleteJob.LocationCountry) &&
            incompleteJobEntity.LocationCountry != updatedIncompleteJob.LocationCountry &&
            (incompleteJobEntity.Location == updatedIncompleteJob.Location ||
             string.IsNullOrEmpty(updatedIncompleteJob.Location)))
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

    public async Task<IncompleteJob> UpdateIncompleteJobSalary(int incompleteJobId,
        IncompleteJobSalary? incompleteJobSalary)
    {
        CheckIfValidSalaryProvided(incompleteJobSalary);
        var incompleteJobEntity = await _incompleteJobQueryRepository.GetIncompleteJobById(incompleteJobId);
        CheckIfEmployerHasAccessToPerformAnAction(incompleteJobEntity);
        incompleteJobEntity.Salary = incompleteJobSalary;
        return incompleteJobEntity;
    }


    public async Task<IncompleteJob> DeleteIncompleteJob(int incompleteJobId)
    {
        var incompleteJobEntity = await _incompleteJobQueryRepository.GetIncompleteJobById(incompleteJobId);
        CheckIfEmployerHasAccessToPerformAnAction(incompleteJobEntity);

        return incompleteJobEntity;
    }

    private void CheckIfValidSalaryProvided(IncompleteJobSalary? salary)
    {
        if (salary != null && !salary.MeetsMinSalaryRequirement)
        {
            if (!SalaryRateHelper.CheckMinimalSalary(salary.MinimalAmount, salary.SalaryRate))
                throw new InvalidJobException("This wage appears to be below the minimum wage for this location");
        }
    }

    private void CheckIfEmployerHasAccessToPerformAnAction(IncompleteJob incompleteJob)
    {
        if (incompleteJob.Employer.UserId != _employerService.GetCurrentEmployerId()) throw new ForbiddenException();
    }
}