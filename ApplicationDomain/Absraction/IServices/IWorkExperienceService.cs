using ApplicationDomain.Models;

namespace ApplicationDomain.Absraction.IServices;

public interface IWorkExperienceService
{
    public Task<WorkExperience> AddWorkExperience(int resumeId, WorkExperience workExperience);
    public Task<WorkExperience> UpdateWorkExperience(int workExperienceId, int userId, WorkExperience updatedWorkExperience);
    public Task<WorkExperience> Delete(int workExperienceId, int userId);
}