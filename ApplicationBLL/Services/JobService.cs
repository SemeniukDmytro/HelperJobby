using System.ComponentModel.DataAnnotations;
using ApplicationBLL.Logic;
using ApplicationDomain.Absraction.IQueryRepositories;
using ApplicationDomain.Absraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;

namespace ApplicationBLL.Services;

public class JobService : IJobService
{
    private readonly IUserService _userServiceMock;
    private readonly IEmployerAccountQueryRepository _employerAccountQueryRepository;
    private readonly IJobQueryRepository _jobQueryRepository;

    public JobService(IUserService userServiceMock, IEmployerAccountQueryRepository employerAccountQueryRepository, IJobQueryRepository jobQueryRepository)
    {
        _userServiceMock = userServiceMock;
        _employerAccountQueryRepository = employerAccountQueryRepository;
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
        var jobEntity = await _jobQueryRepository.GetJobById(jobId, employerAccountId);
        
        if (jobEntity.EmployerAccountId != employerAccountId)
        {
            throw new ForbiddenException();
        }

        var updatedEntity = JobUpdateValidation<CurrentJobCreation>.Update(jobEntity, updatedJob);
        return updatedEntity;
    }

    public async Task<Job> DeleteJob(int jobId, int employerAccountId)
    {
        var jobEntity = await _jobQueryRepository.GetJobById(jobId, employerAccountId);
        if (jobEntity.EmployerAccountId != employerAccountId)
        {
            throw new ForbiddenException();
        }

        return jobEntity;
    }

    public Task<SavedJob> SaveJob(int jobId, int jobSeekerId)
    {
        throw new NotImplementedException();
    }

    public Task<SavedJob> RemoveFromSaved(int jobId, int jobSeekerId)
    {
        throw new NotImplementedException();
    }
}