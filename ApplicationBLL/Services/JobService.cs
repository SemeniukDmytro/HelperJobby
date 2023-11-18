using System.ComponentModel.DataAnnotations;
using ApplicationBLL.Logic;
using ApplicationDomain.Abstraction.ICommandRepositories;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;

namespace ApplicationBLL.Services;

public class JobService : IJobService
{
    private readonly IJobQueryRepository _jobQueryRepository;

    public JobService(IJobQueryRepository jobQueryRepository)
    {
        _jobQueryRepository = jobQueryRepository;
    }

    public async Task<Job> CreateJob(Job job)
    {
        if (!Validator.TryValidateObject(job, new ValidationContext(job), null, true))
        {
            throw new JobNotValidException();
        }

        return job;
    }

    public async Task<Job> UpdateJob(int jobId, int employerAccountId, Job updatedJob)
    {
        var jobEntity = await _jobQueryRepository.GetJobForEmployersById(jobId, employerAccountId);
        
        if (jobEntity.EmployerAccountId != employerAccountId)
        {
            throw new ForbiddenException();
        }

        var updatedEntity = JobUpdateValidation<CurrentJobCreation>.Update(jobEntity, updatedJob);
        return updatedEntity;
    }

    public async Task<Job> DeleteJob(int jobId, int employerAccountId)
    {
        var jobEntity = await _jobQueryRepository.GetJobForEmployersById(jobId, employerAccountId);
        if (jobEntity.EmployerAccountId != employerAccountId)
        {
            throw new ForbiddenException();
        }

        return jobEntity;
    }
}