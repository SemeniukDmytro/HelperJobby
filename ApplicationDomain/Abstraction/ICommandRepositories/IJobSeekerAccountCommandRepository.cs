using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.ICommandRepositories;

public interface IJobSeekerAccountCommandRepository
{
    public Task<JobSeekerAccount> UpdateJobSeekerAccount(JobSeekerAccount jobSeekerAccount);
}