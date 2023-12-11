using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.IQueryRepositories;

public interface IWorkExperienceQueryRepository
{
    public Task<WorkExperience> GetWorkExperienceById(int workExperienceId);
    public Task<WorkExperience> GetWorkExperienceWithResume(int workExperienceId);
}