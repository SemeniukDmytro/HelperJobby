using ApplicationBLL.Interfaces;
using ApplicationDomain.Absraction.IQueryRepositories;
using ApplicationDomain.Absraction.IServices;
using ApplicationDomain.Models;

namespace ApplicationBLL.Services;

public class ResumeService : IResumeService
{
    private readonly ICurrentUserChecker _currentUserChecker;
    private readonly IResumeQueryRepository _resumeQueryRepository;
    private readonly IJobSeekerAccountQueryRepository _jobSeekerAccountQueryRepository;

    public ResumeService(ICurrentUserChecker currentUserChecker, IResumeQueryRepository resumeQueryRepository, 
        IJobSeekerAccountQueryRepository jobSeekerAccountQueryRepository)
    {
        _currentUserChecker = currentUserChecker;
        _resumeQueryRepository = resumeQueryRepository;
        _jobSeekerAccountQueryRepository = jobSeekerAccountQueryRepository;
    }

    public async Task<Resume> CreateResume(int userId, Resume resume)
    {
        _currentUserChecker.IsCurrentUser(userId);
        var jobSeekerAccount = await  _jobSeekerAccountQueryRepository.GetJobSeekerAccountByUserId(userId);
        resume.JobSeekerAccountId = jobSeekerAccount.Id;
        return resume;
    }


    public async Task<Resume> DeleteResume(int userId, int resumeId)
    {
        _currentUserChecker.IsCurrentUser(userId);
        var resumeEntity = await _resumeQueryRepository.GetResumeById(resumeId);
        return resumeEntity;
    }
}