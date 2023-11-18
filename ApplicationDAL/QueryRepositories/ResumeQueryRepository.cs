using ApplicationDAL.Context;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;
using Microsoft.EntityFrameworkCore;

namespace ApplicationDAL.QueryRepositories;

public class ResumeQueryRepository : IResumeQueryRepository
{
    private readonly ApplicationContext _applicationContext;

    public ResumeQueryRepository(ApplicationContext applicationContext)
    {
        _applicationContext = applicationContext;
    }

    public async Task<Resume> GetResumeById(int resumeId)
    {
        var resume = await _applicationContext.Resumes.Include(r => r.JobSeekerAccount).FirstOrDefaultAsync(r => r.Id == resumeId);
        if (resume == null)
        {
            throw new ResumeNotFoundException();
        }
        await _applicationContext.Entry(resume).Collection(r => r.Educations).LoadAsync();
        await _applicationContext.Entry(resume).Collection(r => r.WorkExperiences).LoadAsync();
        await _applicationContext.Entry(resume).Collection(r => r.Skills).LoadAsync();
        return resume;
    }
}