using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.ICommandRepositories;

public interface IJobSeekerCommandRepository
{
    public Task<JobSeeker> UpdateJobSeeker(JobSeeker jobSeeker);
}