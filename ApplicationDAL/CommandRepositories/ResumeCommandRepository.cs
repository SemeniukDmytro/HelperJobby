using ApplicationDAL.Context;
using ApplicationDomain.Absraction.ICommandRepositories;
using ApplicationDomain.Models;

namespace ApplicationDAL.CommandRepositories;

public class ResumeCommandRepository : IResumeCommandRepository
{
    private readonly ApplicationContext _applicationContext;

    public ResumeCommandRepository(ApplicationContext applicationContext)
    {
        _applicationContext = applicationContext;
    }

    public async Task<Resume> CreateResume(Resume resume)
    {
        _applicationContext.Resumes.Add(resume);
        await _applicationContext.SaveChangesAsync();
        return resume;
    }

    public async Task DeleteResume(Resume resume)
    {
        _applicationContext.Resumes.Remove(resume);
        await _applicationContext.SaveChangesAsync();
    }
}