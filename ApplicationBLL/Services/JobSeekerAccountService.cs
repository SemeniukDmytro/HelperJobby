using ApplicationDomain.Absraction.IQueryRepositories;
using ApplicationDomain.Absraction.IServices;
using ApplicationDomain.Models;

namespace ApplicationBLL.Services;

public class JobSeekerAccountService : IJobSeekerAccountService
{
    private readonly IJobSeekerAccountQueryRepository _jobSeekerAccountQueryRepository;
    private readonly IUserService _userService;

    public JobSeekerAccountService(IJobSeekerAccountQueryRepository jobSeekerAccountQueryRepository, IUserService userService)
    {
        _jobSeekerAccountQueryRepository = jobSeekerAccountQueryRepository;
        _userService = userService;
    }

    public Task<JobSeekerAccount> UpdateJobSeekerAccount(int id, JobSeekerAccount updatedAccount)
    {
        throw new NotImplementedException();
    }

    public Task SaveJob(int jobId, int jobSeekerAccountId)
    {
        throw new NotImplementedException();
    }

    public Task RemoveJobFromSaved(int jobId, int jobSeekerAccountId)
    {
        throw new NotImplementedException();
    }
}