using ApplicationDomain.Models;

namespace ApplicationDomain.Absraction.ICommandRepositories;

public interface IWorkExperienceCommandRepository
{
    public Task<WorkExperience> Create(WorkExperience workExperience);
    public Task<WorkExperience> Update(WorkExperience workExperience);
    public Task Delete(WorkExperience workExperience);
}