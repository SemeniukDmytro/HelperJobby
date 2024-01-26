using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.IServices;

public interface IInterviewService
{
    public Task<Job> GetInterviewsForSpecificJob(int jobId);
    public Task<Interview> PostInterview(int jobId, int jobSeekerId, Interview interviewInfo);
    public Task<Interview> DeleteInterview(int jobId, int jobSeekerId);
}