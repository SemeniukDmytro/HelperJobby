using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.IQueryRepositories;

public interface IJobSeekerQueryRepository
{
    public Task<JobSeeker> GetJobSeekerByUserId(int userId);
    public Task<JobSeeker> GetJobSeekerWithResume(int userId);
    public Task<JobSeeker> GetJobSeekerWithJobInteractions(int userId);
    public Task<JobSeeker> GetJobSeekerWithAddress(int userId);
    public Task<JobSeeker> GetJobSeekerWithAddressAndResume(int userId);
    public Task<IEnumerable<SavedJob>> GetJobSeekerSavedJobs(int userId);
    public Task<IEnumerable<JobApply>> GetJobSeekerWithJobApplies(int userId);
    public Task<IEnumerable<Interview>> GetJobSeekerWithInterviews(int userId);
}