using ApplicationDomain.Absraction.IServices;
using Moq;

namespace ApplicationBLLUnitTests;

public class ResumeServiceTests
{
    private readonly Mock<IResumeService> _resumeServiceMock;

    public ResumeServiceTests(Mock<IResumeService> resumeServiceMock)
    {
        _resumeServiceMock = resumeServiceMock;
    }

    [Fact]
    public async Task CreateResumeShouldReturnCreatedResume()
    {
        
    }

    [Fact]
    public async Task CreateResumeShouldThrowForbiddenExceptionIfNotCurrentUserTriesToCreate()
    {
        
    }

    [Fact]
    public async Task UpdateResumeShouldReturnUpdatedResume()
    {
        
    }

    [Fact]
    public async Task UpdateResumeShouldThrowForbiddenExceptionIfNotCurrentUserTriesToUpdate()
    {
        
    }

    [Fact]
    public async Task DeleteResumeShouldReturnResumeToDelete()
    {
        
    }

    [Fact]
    public async Task DeleteResumeShouldThrowForbiddenExceptionIfNotCurrentUserTriesToDelete()
    {
        
    }
}