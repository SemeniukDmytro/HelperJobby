using ApplicationDomain.Models;

namespace ApplicationDomain.Absraction.IServices;

public interface IEducationService
{
    public Task<Education> AddEducation(int resumeId, Education education);
    public Task<Education> UpdateEducation(int educationId, int userId, Education updatedEducation);
    public Task<Education> Delete(int educationId, int userId);
}