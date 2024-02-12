using System.ComponentModel.DataAnnotations;
using ApplicationBLL.Logic;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;

namespace ApplicationBLL.Services;

public class JobService : IJobService
{
    private readonly IJobQueryRepository _jobQueryRepository;
    private readonly IUserService _userService;

    public JobService(IJobQueryRepository jobQueryRepository, IUserService userService)
    {
        _jobQueryRepository = jobQueryRepository;
        _userService = userService;
    }

    public async Task<Job> CreateJob(Job job)
    {
        if (!Validator.TryValidateObject(job, new ValidationContext(job), null, true)) throw new InvalidJobException();
        
        if (job.Salary != null && !job.Salary.MeetsMinSalaryRequirement)
        {
            if (!SalaryRateHelper.CheckMinimalSalary(job.Salary.MinimalAmount, job.Salary.SalaryRate))
                throw new InvalidJobException("Salary wage appears to be below the minimum wage for this location");
        }

        job.Employer.HasPostedFirstJob = true;
        job.DatePosted = DateOnly.FromDateTime(DateTime.UtcNow);
        return job;
    }

    public async Task<Job> UpdateJob(int jobId, Job updatedJob)
    {
        var currentUserId = _userService.GetCurrentUserId();
        var jobEntity = await _jobQueryRepository.GetJobByIdWithEmployer(jobId);

        if (jobEntity.Employer.UserId != currentUserId)
            throw new ForbiddenException("You can not update this job information");

        var locationChangeNeeded = false;
        
        if (!string.IsNullOrEmpty(updatedJob.LocationCountry) && jobEntity.LocationCountry != updatedJob.LocationCountry &&
            (jobEntity.Location == updatedJob.Location || string.IsNullOrEmpty(updatedJob.Location)))
        {
            locationChangeNeeded = true;
        }

        var updatedEntity = EntitiesUpdateManager<IncompleteJob>.UpdateEntityProperties(jobEntity, updatedJob);
        if (updatedJob.Salary != null && !updatedJob.Salary.MeetsMinSalaryRequirement)
        {
            if (!SalaryRateHelper.CheckMinimalSalary(updatedJob.Salary.MinimalAmount, updatedJob.Salary.SalaryRate))
                throw new InvalidJobException("This wage appears to be below the minimum wage for this location");
        }
        
        if (jobEntity.Salary == null)
        {
            updatedEntity.Salary = updatedJob.Salary;
        }
        else
        {
            var updatedSalary = EntitiesUpdateManager<IncompleteJobSalary>.UpdateEntityProperties(updatedEntity.Salary,
                updatedJob.Salary);
            updatedEntity.Salary = updatedSalary;
        }
        
        
        updatedEntity.Location = locationChangeNeeded ? "" : updatedEntity.Location;
        return updatedEntity;
    }

    public async Task<Job> DeleteJob(int jobId)
    {
        var currentUserId = _userService.GetCurrentUserId();
        var jobEntity = await _jobQueryRepository.GetJobByIdWithEmployer(jobId);

        if (jobEntity.Employer.UserId != currentUserId)
            throw new ForbiddenException("You can not delete this job");

        return jobEntity;
    }
}