using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.IQueryRepositories;

public interface IJobSeekerQueryRepository
{
    public Task<JobSeeker> GetJobSeeker(int jobSeekerId);
    public Task<JobSeeker> GetJobSeekerByIdWithResume(int jobSeekerId);
    public Task<JobSeeker> GetJobSeekerByIdWithJobInteractions(int jobSeekerId);
    public Task<JobSeeker> GetJobSeekerByIdWithAddress(int jobSeekerId);
    public Task<JobSeeker> GetJobSeekerByIdWithAddressAndResume(int jobSeekerId);
}