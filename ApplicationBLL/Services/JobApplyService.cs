using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Models;

namespace ApplicationBLL.Services;

public class JobApplyService : IJobApplyService
{
    public Task<JobApply> PostJobApply(int jobId, int jobSeekerId)
    {
        throw new NotImplementedException();
    }

    public Task<JobApply> DeleteJobApply(int jobId, int jobSeekerId)
    {
        throw new NotImplementedException();
    }
}