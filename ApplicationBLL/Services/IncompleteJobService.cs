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
        incompleteJob.EmployerId = employer.Id;
        return incompleteJob;
    }

    public async Task<IncompleteJob> UpdateIncompleteJob(int incompleteJobId, IncompleteJob updatedIncompleteJob)
    {
        var currentEmployer = await _employerQueryRepository.GetEmployer(_userService.GetCurrentUserId());
        var incompleteJobEntity = await _incompleteJobQueryRepository.GetIncompleteJobById(incompleteJobId);

        if (incompleteJobEntity.EmployerId != currentEmployer.Id) throw new ForbiddenException();

        var updatedEntity = EntitiesUpdator<IncompleteJob>
            .UpdateEntityProperties(incompleteJobEntity, updatedIncompleteJob);
        if (incompleteJobEntity.Salary == null)
        {
            updatedEntity.Salary = updatedIncompleteJob.Salary;
        }
        else
        {
            var updatedSalary = EntitiesUpdator<IncompleteJobSalary>.UpdateEntityProperties(updatedEntity.Salary,
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