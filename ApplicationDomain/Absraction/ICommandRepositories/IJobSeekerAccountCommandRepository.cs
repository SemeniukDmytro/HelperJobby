using ApplicationDomain.Models;

namespace ApplicationDomain.Absraction.ICommandRepositories;

public interface IJobSeekerAccountCommandRepository
{
    public Task<JobSeekerAccount> UpdateJobSeekerAccount(JobSeekerAccount jobSeekerAccount);
}