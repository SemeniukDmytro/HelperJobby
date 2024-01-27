using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.IServices;

public interface IInterviewService
{
    public Task<Job> GetInterviewsForSpecificJob(int jobId);
    public Task<Interview> PostInterview(int jobId, int jobSeekerId, Interview interviewInfo);
    public Task<Interview> CancelInterviewFromEmployerAccount(int jobId, int jobSeekerId);

    public Task<Interview> CancelInterviewFromJobSeekerAccount(int jobId);
}