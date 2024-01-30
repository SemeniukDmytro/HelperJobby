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
        if (resume == null) throw new ResumeNotFoundException();
        return resume;
    }

    public async Task<Resume> GetResumeByJobSeekerId(int jobSeekerId)
    {
        var resume = await _applicationContext.Resumes.Where(r => r.JobSeekerAccountId == jobSeekerId)
            .Select(r => new Resume
            {
                Id = r.Id,
                Educations = r.Educations,
                WorkExperiences = r.WorkExperiences,
                Skills = r.Skills
            }).FirstOrDefaultAsync();
        if (resume == null) throw new ResumeNotFoundException();

        resume.JobSeekerAccountId = jobSeekerId;
        return resume;
    }

    public async Task<IEnumerable<Resume>> GetResumesByResumeIds(List<int> resumeIds)
    {
        var resumes = await _applicationContext.Resumes
            .Where(r => resumeIds.Contains(r.Id))
            .Select(r => new Resume
            {
                Id = r.Id,
                Educations = r.Educations
                    .Select(e => new Education { FieldOfStudy = e.FieldOfStudy, LevelOfEducation = e.LevelOfEducation })
                    .ToList(),

                WorkExperiences = r.WorkExperiences
                    .Select(w => new WorkExperience { JobTitle = w.JobTitle })
                    .ToList(),

                Skills = r.Skills
                    .Select(s => new Skill { Name = s.Name })
                    .ToList()
            })
            .ToListAsync();

        return resumes;
    }
}