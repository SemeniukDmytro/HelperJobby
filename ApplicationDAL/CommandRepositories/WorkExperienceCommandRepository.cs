using ApplicationDAL.Context;
using ApplicationDomain.Abstraction.ICommandRepositories;
using ApplicationDomain.Models;

namespace ApplicationDAL.CommandRepositories;

public class WorkExperienceCommandRepository : IWorkExperienceCommandRepository
{
    private readonly ApplicationContext _applicationContext;

    public WorkExperienceCommandRepository(ApplicationContext applicationContext)
    {
        _applicationContext = applicationContext;
    }

    public async Task<WorkExperience> Create(WorkExperience workExperience)
    {
        _applicationContext.WorkExperiences.Add(workExperience);
        await _applicationContext.SaveChangesAsync();
        return workExperience;
    }

    public async Task<WorkExperience> Update(WorkExperience workExperience)
    {
        _applicationContext.WorkExperiences.Update(workExperience);
        await _applicationContext.SaveChangesAsync();
        return workExperience;
    }

    public async Task Delete(WorkExperience workExperience)
    {
        _applicationContext.WorkExperiences.Remove(workExperience);
        await _applicationContext.SaveChangesAsync();
    }
}