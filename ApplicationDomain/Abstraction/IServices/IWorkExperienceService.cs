using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.IServices;

public interface IWorkExperienceService
{
    public Task<WorkExperience> AddWorkExperience(int resumeId, WorkExperience createdWorkExperience);
    public Task<WorkExperience> UpdateWorkExperience(int workExperienceId, WorkExperience updatedWorkExperience);
    public Task<(WorkExperience workExperience, bool isResumeNeedToBeDeleted)> DeleteWorkExperience(int workExperienceId);
}