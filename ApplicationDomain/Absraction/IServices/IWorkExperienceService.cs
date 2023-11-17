using ApplicationDomain.Models;

namespace ApplicationDomain.Absraction.IServices;

public interface IWorkExperienceService
{
    public Task<WorkExperience> AddEducation(int resumeId, WorkExperience education);
    public Task<WorkExperience> UpdateEducation(int workExperienceId, int userId, WorkExperience updatedEducation);
    public Task<WorkExperience> Delete(int workExperienceId, int userId);
}