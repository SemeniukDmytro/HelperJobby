using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.IServices;

public interface IEducationService
{
    public Task<Education> AddEducation(int resumeId, Education education);
    public Task<Education> UpdateEducation(int educationId, Education updatedEducation);
    public Task<(Education educationToDelete, bool isResumeNeedToBeDeleted)> Delete(int educationId);
}