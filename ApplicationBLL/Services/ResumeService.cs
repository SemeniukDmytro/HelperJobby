using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;

namespace ApplicationBLL.Services;

public class ResumeService : IResumeService
{
    private readonly IJobSeekerService _jobSeekerService;
    private readonly IResumeQueryRepository _resumeQueryRepository;

    public ResumeService(IResumeQueryRepository resumeQueryRepository, IJobSeekerService jobSeekerService)
    {
        _resumeQueryRepository = resumeQueryRepository;
        _jobSeekerService = jobSeekerService;
    }

    public async Task<Resume> CreateResume(Resume createdResume)
    {
        var currentJobSeekerId = _jobSeekerService.GetCurrentJobSeekerId();
        Resume resume = null;
        try
        {
            resume = await _resumeQueryRepository.GetResumeByJobSeekerId(currentJobSeekerId);
        }
        catch (Exception e)
        {
        }

        if (resume != null) throw new ForbiddenException("Resume already exists");
        createdResume.JobSeekerId = currentJobSeekerId;
        createdResume.CreatedOn = DateOnly.FromDateTime(DateTime.UtcNow);
        return createdResume;
    }


    public async Task<Resume> DeleteResume(int resumeId)
    {
        var currentJobSeekerId = _jobSeekerService.GetCurrentJobSeekerId();
        var resume = await _resumeQueryRepository.GetResumeByJobSeekerId(currentJobSeekerId);
        if (resumeId != resume.Id) throw new ForbiddenException();
        return resume;
    }
}