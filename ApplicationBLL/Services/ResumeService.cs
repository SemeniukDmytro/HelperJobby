using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;

namespace ApplicationBLL.Services;

public class ResumeService : IResumeService
{
    private readonly IJobSeekerQueryRepository _jobSeekerQueryRepository;
    private readonly IUserService _userService;

    public ResumeService(IUserService userService,
        IJobSeekerQueryRepository jobSeekerQueryRepository)
    {
        _userService = userService;
        _jobSeekerQueryRepository = jobSeekerQueryRepository;
    }

    public async Task<Resume> CreateResume(Resume createdResume)
    {
        var currentUserId = _userService.GetCurrentUserId();
        var jobSeeker = await _jobSeekerQueryRepository.GetJobSeekerWithResume(currentUserId);
        if (jobSeeker.Resume != null) throw new ForbiddenException("Resume already exists");
        createdResume.JobSeekerId = jobSeeker.Id;
        return createdResume;
    }


    public async Task<Resume> DeleteResume(int resumeId)
    {
        var currentUserId = _userService.GetCurrentUserId();
        var jobSeeker = await _jobSeekerQueryRepository.GetJobSeekerWithResume(currentUserId);
        if (resumeId != jobSeeker.Resume.Id) throw new ForbiddenException();
        return jobSeeker.Resume;
    }
}