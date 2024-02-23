using ApplicationDAL.Context;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;
using Microsoft.EntityFrameworkCore;

namespace ApplicationDAL.QueryRepositories;

public class WorkExperienceQueryRepository : IWorkExperienceQueryRepository
{
    private readonly ApplicationContext _applicationContext;

    public WorkExperienceQueryRepository(ApplicationContext applicationContext)
    {
        _applicationContext = applicationContext;
    }

    public async Task<WorkExperience> GetWorkExperienceById(int workExperienceId)
    {
        return await GetEducation(workExperienceId);
    }

    public async Task<WorkExperience> GetWorkExperienceWithResume(int workExperienceId)
    {
        return await GetEducation(workExperienceId, q => q.Include(w => w.Resume));
    }

    private async Task<WorkExperience> GetEducation(int workExperienceId,
        Func<IQueryable<WorkExperience>, IQueryable<WorkExperience>> includeFunc = null)
    {
        var query = _applicationContext.WorkExperiences.AsQueryable();
        if (includeFunc != null) query = includeFunc(query);

        var workExperience = await query.FirstOrDefaultAsync(e => e.Id == workExperienceId);
        if (workExperience == null) throw new WorkExperienceNotFoundException();
        return workExperience;
    }
}