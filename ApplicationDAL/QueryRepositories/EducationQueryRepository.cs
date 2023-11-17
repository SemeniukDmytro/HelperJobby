using ApplicationDAL.Context;
using ApplicationDomain.Absraction.IQueryRepositories;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;
using Microsoft.EntityFrameworkCore;

namespace ApplicationDAL.QueryRepositories;

public class EducationQueryRepository : IEducationQueryRepository
{
    private readonly ApplicationContext _applicationContext;

    public EducationQueryRepository(ApplicationContext applicationContext)
    {
        _applicationContext = applicationContext;
    }

    public async Task<Education> GetEducationById(int id)
    {
        return await GetEducation(id);
    }

    public async Task<Education> GetEducationWithResume(int educationId)
    {
        return await GetEducation(educationId, q => q.Include(e => e.Resume));
    }
    
    private async Task<Education> GetEducation(int educationId, Func<IQueryable<Education>, IQueryable<Education>> includeFunc = null)
    {
        var query = _applicationContext.Educations.AsQueryable();
        if (includeFunc != null)
        {
            query = includeFunc(query);
        }

        var education = await query.FirstOrDefaultAsync(e => e.Id == educationId);
        if (education == null)
        {
            throw new EducationNotFoundException();
        }
        return education;
    }
}