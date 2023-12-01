using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.IServices;

public interface IResumeContentIndexingService
{
    public Task IndexResumeContent(Resume resume);

    public Task RemoveResumeIndexedContent(Resume resume);

    public Task IndexResumeRelatedContent(string content, int resumeId);

    public Task UpdateIndexedResumeRelatedContent(string oldContent, string updatedContent, int resumeId);
    public Task RemoveIndexedResumeRelatedContent(string content, int resumeId);
}