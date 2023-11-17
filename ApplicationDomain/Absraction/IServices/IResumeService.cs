using ApplicationDomain.Models;

namespace ApplicationDomain.Absraction.IServices;

public interface IResumeService
{
    public Task<Resume> CreateResume(int userId, Resume resume);
    public Task<Resume> DeleteResume(int resumeId, int userId);
}