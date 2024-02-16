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
    private readonly IEmployerService _employerService;

    public JobService(IJobQueryRepository jobQueryRepository, IEmployerService employerService)
    {
        _jobQueryRepository = jobQueryRepository;
        _employerService = employerService;
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
        CheckIfValidSalaryProvided(updatedJob.Salary);
        
        var jobEntity = await _jobQueryRepository.GetJobByIdWithEmployer(jobId);
        CheckIfUserHasAccessToPerformAnAction(jobEntity);


        var locationChangeNeeded = false;
        
        if (!string.IsNullOrEmpty(updatedJob.LocationCountry) && jobEntity.LocationCountry != updatedJob.LocationCountry &&
            (jobEntity.Location == updatedJob.Location || string.IsNullOrEmpty(updatedJob.Location)))
        {
            locationChangeNeeded = true;
        }

        var updatedEntity = EntitiesUpdateManager<IncompleteJob>.UpdateEntityProperties(jobEntity, updatedJob);
        
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

    public async Task<Job> UpdateJobSalary(int jobId, JobSalary updatedSalary)
    {
        var jobEntity = await _jobQueryRepository.GetJobByIdWithEmployer(jobId);
        CheckIfUserHasAccessToPerformAnAction(jobEntity);
        CheckIfValidSalaryProvided(updatedSalary);
        jobEntity.Salary = updatedSalary;
        return jobEntity;
    }

    public async Task<Job> DeleteJob(int jobId)
    {
        var jobEntity = await _jobQueryRepository.GetJobByIdWithEmployer(jobId);
        CheckIfUserHasAccessToPerformAnAction(jobEntity);

        return jobEntity;
    }
    
    private void CheckIfValidSalaryProvided(JobSalary? salary)
    {
        Console.WriteLine(salary);
        if (salary != null && !salary.MeetsMinSalaryRequirement)
        {
            if (!SalaryRateHelper.CheckMinimalSalary(salary.MinimalAmount, salary.SalaryRate))
                throw new InvalidJobException("This wage appears to be below the minimum wage for this location");
        }
    }

    private void CheckIfUserHasAccessToPerformAnAction(Job job)
    {
        if (job.Employer.Id != _employerService.GetCurrentEmployerId()) throw new ForbiddenException();
    }
}