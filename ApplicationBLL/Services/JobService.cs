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
    private readonly IUserService _userService;
    private readonly IEmployerAccountQueryRepository _employerAccountQueryRepository;
    private readonly IContentIndexingService _contentIndexingService;

    public JobService(IJobQueryRepository jobQueryRepository, IUserService userService, IEmployerAccountQueryRepository employerAccountQueryRepository, IContentIndexingService contentIndexingService)
    {
        _jobQueryRepository = jobQueryRepository;
        _userService = userService;
        _employerAccountQueryRepository = employerAccountQueryRepository;
        _contentIndexingService = contentIndexingService;
    }

    public async Task<Job> CreateJob(Job job)
    {
        if (!Validator.TryValidateObject(job, new ValidationContext(job), null, true))
        {
            throw new JobNotValidException();
        }

        await _contentIndexingService.IndexJobContent(job);
        return job;
    }

    public async Task<Job> UpdateJob(int jobId, Job updatedJob)
    {
        var currentUserId = _userService.GetCurrentUserId();
        var employer = await _employerAccountQueryRepository.GetEmployerAccount(currentUserId);
        var jobEntity = await _jobQueryRepository.GetJobById(jobId);
        
        if (jobEntity.EmployerAccountId != employer.Id)
        {
            throw new ForbiddenException("You can not update this job information");
        }

        var updatedEntity = JobUpdateValidation<CurrentJobCreation>.Update(jobEntity, updatedJob);
        return updatedEntity;
    }

    public async Task<Job> DeleteJob(int jobId)
    {
        var currentUserId = _userService.GetCurrentUserId();
        var employer = await _employerAccountQueryRepository.GetEmployerAccount(currentUserId);
        var jobEntity = await _jobQueryRepository.GetJobById(jobId);
        if (jobEntity.EmployerAccountId != employer.Id)
        {
            throw new ForbiddenException("You can not delete this job");
        }

        return jobEntity;
    }
}