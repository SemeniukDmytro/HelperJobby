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
        var resume = await _applicationContext.Resumes
            .Include(r => r.JobSeekerAccount)
            .Include(r => r.Educations)
            .Include(r => r.WorkExperiences)
            .Include(r => r.Skills)
            .FirstOrDefaultAsync(r => r.Id == resumeId);
        if (resume == null)
        {
            throw new ResumeNotFoundException();
        }
        return resume;
    }
}