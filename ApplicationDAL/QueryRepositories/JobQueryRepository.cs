using ApplicationDAL.Context;
using ApplicationDomain.Absraction.IQueryRepositories;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;
using Microsoft.EntityFrameworkCore;

namespace ApplicationDAL.QueryRepositories;

public class JobQueryRepository : IJobQueryRepository
{
    private readonly ApplicationContext _applicationContext;
    private readonly IEmployerAccountQueryRepository _employerAccountQueryRepository;
    private readonly IOrganizationQueryRepository _organizationQueryRepository;

    public JobQueryRepository(ApplicationContext applicationContext, IEmployerAccountQueryRepository employerAccountQueryRepository, 
        IOrganizationQueryRepository organizationQueryRepository)
    {
        _applicationContext = applicationContext;
        _employerAccountQueryRepository = employerAccountQueryRepository;
        _organizationQueryRepository = organizationQueryRepository;
    }

    public async Task<Job> GetJobById(int id, int employerAccountId)
    {
        var job = await _applicationContext.Jobs.FirstOrDefaultAsync(j => j.Id == id);
        if (job == null)
        {
            throw new JobNotFoundException();
        }
        
        if (job.EmployerAccountId != employerAccountId)
        {
            throw new ForbiddenException();
        }
        return job;
    }

    public async Task<IEnumerable<Job>> GetJobsByUserId(int userId)
    {
        var employerAccount = await _employerAccountQueryRepository.GetEmployerAccount(userId);
        await _applicationContext.Entry(employerAccount).Collection(e => e.Jobs).LoadAsync();
        return employerAccount.Jobs;
    }

    public async Task<IEnumerable<Job>> GetJobsByOrganizationId(int organizationId)
    {
        var organization = await _organizationQueryRepository.GetOrganizationWithEmployees(organizationId);
        List<Job> result = new List<Job>();
        foreach (var employerAccount in organization.EmployeeAccounts)
        {
            result.AddRange(await GetJobsByUserId(employerAccount.Id));
        }

        return result;
    }
}