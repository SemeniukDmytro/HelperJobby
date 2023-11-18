using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.IServices;

public interface IResumeService
{
    public Task<Resume> CreateResume(int userId, Resume resume);
    public Task<Resume> DeleteResume(int resumeId, int userId);
}