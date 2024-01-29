using ApplicationDAL.Context;
using ApplicationDomain.Abstraction.ICommandRepositories;
using ApplicationDomain.Models;
using Microsoft.EntityFrameworkCore;

namespace ApplicationDAL.CommandRepositories;

public class JobSeekerAccountCommandRepository : IJobSeekerAccountCommandRepository
{
    private readonly ApplicationContext _applicationContext;

    public JobSeekerAccountCommandRepository(ApplicationContext applicationContext)
    {
        _applicationContext = applicationContext;
    }

    public async Task<JobSeekerAccount> UpdateJobSeekerAccount(JobSeekerAccount jobSeekerAccount)
    {
        if (jobSeekerAccount.Address != null && jobSeekerAccount.Address.Id != 0)
        {
            _applicationContext.Entry(jobSeekerAccount.Address).State = EntityState.Modified;
        }
        _applicationContext.JobSeekerAccounts.Update(jobSeekerAccount);
        await _applicationContext.SaveChangesAsync();
        return jobSeekerAccount;
    }
}