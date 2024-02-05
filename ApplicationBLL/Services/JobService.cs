using System.ComponentModel.DataAnnotations;
using ApplicationBLL.Logic;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;

namespace ApplicationBLL.Services;

public class JobService : IJobService
{
    private readonly IEmployerAccountQueryRepository _employerAccountQueryRepository;
    private readonly IJobQueryRepository _jobQueryRepository;
    private readonly IUserService _userService;

    public JobService(IJobQueryRepository jobQueryRepository, IUserService userService,
        IEmployerAccountQueryRepository employerAccountQueryRepository)
    {
        _jobQueryRepository = jobQueryRepository;
        _userService = userService;
        _employerAccountQueryRepository = employerAccountQueryRepository;
    }

    public async Task<Job> CreateJob(Job job)
    {
        if (!Validator.TryValidateObject(job, new ValidationContext(job), null, true)) throw new InvalidJobException();
        
        if (job.Salary != null)
        {
            if (!SalaryRateHelper.CheckMinimalSalary(job.Salary.MinimalAmount, job.Salary.SalaryRate))
                throw new InvalidJobException("This wage appears to be below the minimum wage for this location");
        }
        job.DatePosted = DateOnly.FromDateTime(DateTime.UtcNow);
        return job;
    }

    public async Task<Job> UpdateJob(int jobId, Job updatedJob)
    {
        var currentUserId = _userService.GetCurrentUserId();
        var employer = await _employerAccountQueryRepository.GetEmployerAccount(currentUserId);
        var jobEntity = await _jobQueryRepository.GetJobById(jobId);

        if (jobEntity.EmployerAccountId != employer.Id)
            throw new ForbiddenException("You can not update this job information");

        var updatedEntity = EntitiesUpdator<CurrentJobCreation>.UpdateEntityProperties(jobEntity, updatedJob);
        if (jobEntity.Salary == null)
        {
            updatedEntity.Salary = updatedJob.Salary;
        }
        else
        {
            var updatedSalary = EntitiesUpdator<CurrentJobSalary>.UpdateEntityProperties(updatedEntity.Salary,
                updatedJob.Salary);
            updatedEntity.Salary = updatedSalary;
        }
        return updatedEntity;
    }

    public async Task<Job> DeleteJob(int jobId)
    {
        var currentUserId = _userService.GetCurrentUserId();
        var employer = await _employerAccountQueryRepository.GetEmployerAccount(currentUserId);
        var jobEntity = await _jobQueryRepository.GetJobById(jobId);
        if (jobEntity.EmployerAccountId != employer.Id) throw new ForbiddenException("You can not delete this job");

        return jobEntity;
    }
}