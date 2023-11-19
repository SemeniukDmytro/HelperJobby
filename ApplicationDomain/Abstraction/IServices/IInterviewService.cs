using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.IServices;

public interface IInterviewService
{
    public Task<Interview> PostInterview(int jobId, int jobSeekerId);
    public Task<Interview> DeleteInterview(int jobId, int jobSeekerId);
}