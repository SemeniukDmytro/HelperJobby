using ApplicationDomain.Abstraction.ICommandRepositories;
using ApplicationDomain.Models;

namespace ApplicationDAL.CommandRepositories;

public class JobApplyCommandRepository : IJobApplyCommandRepository
{
    public Task<JobApply> CreateJobApply()
    {
        throw new NotImplementedException();
    }

    public Task DeleteJobApply()
    {
        throw new NotImplementedException();
    }
}