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
        var currentEmployer = await _employerQueryRepository.GetEmployer(_userService.GetCurrentUserId());
        var incompleteJobEntity = await _incompleteJobQueryRepository.GetIncompleteJobById(incompleteJobId);

        if (incompleteJobEntity.EmployerId != currentEmployer.Id) throw new ForbiddenException();

        var updatedEntity = EntitiesUpdateManager<IncompleteJob>
            .UpdateEntityProperties(incompleteJobEntity, updatedIncompleteJob);
        
        if (updatedIncompleteJob.Salary != null && !updatedIncompleteJob.Salary.MeetsMinSalaryRequirement)
        {
            if (!SalaryRateHelper.CheckMinimalSalary(updatedIncompleteJob.Salary.MinimalAmount, updatedIncompleteJob.Salary.SalaryRate))
                throw new InvalidJobException("This wage appears to be below the minimum wage for this location");
        }
        
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
        return updatedEntity;
    }


    public async Task<IncompleteJob> DeleteIncompleteJob(int incompleteJobId)
    {
        var currentEmployer = await _employerQueryRepository.GetEmployer(_userService.GetCurrentUserId());
        var incompleteJobEntity = await _incompleteJobQueryRepository.GetIncompleteJobById(incompleteJobId);
        if (incompleteJobEntity.EmployerId != currentEmployer.Id) throw new ForbiddenException();

        return incompleteJobEntity;
    }
}