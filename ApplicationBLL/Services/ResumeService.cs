using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;

namespace ApplicationBLL.Services;

public class ResumeService : IResumeService
{
    private readonly IJobSeekerAccountQueryRepository _jobSeekerAccountQueryRepository;
    private readonly IUserService _userService;

    public ResumeService(IUserService userService,
        IJobSeekerAccountQueryRepository jobSeekerAccountQueryRepository)
    {
        _userService = userService;
        _jobSeekerAccountQueryRepository = jobSeekerAccountQueryRepository;
    }

    public async Task<Resume> CreateResume(Resume resume)
    {
        var currentUserId = _userService.GetCurrentUserId();
        var jobSeekerAccount = await _jobSeekerAccountQueryRepository.GetJobSeekerAccountWithResume(currentUserId);
        if (jobSeekerAccount.Resume != null) throw new ForbiddenException("Resume already exists");
        resume.JobSeekerAccountId = jobSeekerAccount.Id;
        return resume;
    }


    public async Task<Resume> DeleteResume(int resumeId)
    {
        var currentUserId = _userService.GetCurrentUserId();
        var jobSeekerAccount = await _jobSeekerAccountQueryRepository.GetJobSeekerAccountWithResume(currentUserId);
        if (resumeId != jobSeekerAccount.Resume.Id) throw new ForbiddenException();
        return jobSeekerAccount.Resume;
    }
}