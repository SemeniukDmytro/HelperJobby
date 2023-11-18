using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Models;

namespace ApplicationBLL.Services;

public class InterviewService : IInterviewService
{
    private readonly IUserService _userService;
    private readonly IJobSeekerAccountQueryRepository _jobSeekerAccountQueryRepository;
    private readonly IJobQueryRepository _jobQueryRepository;

    public InterviewService(IUserService userService, IJobSeekerAccountQueryRepository jobSeekerAccountQueryRepository, IJobQueryRepository jobQueryRepository)
    {
        _userService = userService;
        _jobSeekerAccountQueryRepository = jobSeekerAccountQueryRepository;
        _jobQueryRepository = jobQueryRepository;
    }

    public Task<Interview> PostInterview(int jobId, int jobSeekerId)
    {
        throw new NotImplementedException();
    }

    public Task<Interview> DeleteInterview(int jobId, int jobSeekerId)
    {
        throw new NotImplementedException();
    }
}