using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.IServices;

public interface IResumeService
{
    public Task<Resume> CreateResume(Resume createdResume);
    public Task<Resume> DeleteResume(int resumeId);
}