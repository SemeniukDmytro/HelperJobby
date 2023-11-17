using ApplicationDomain.Models;

namespace ApplicationDomain.Absraction.IQueryRepositories;

public interface IWorkExperienceQueryRepository
{
    public Task<WorkExperience> GetWorkExperienceById(int workExperienceId);
    public Task<WorkExperience> GetWorkExperienceWithResume(int workExperienceId);
}