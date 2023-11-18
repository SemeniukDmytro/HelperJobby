using ApplicationBLL.Services;
using ApplicationBLLUnitTests.Fixture;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Exceptions;
using Moq;

namespace ApplicationBLLUnitTests;

public class InterviewServiceTests
{
    private readonly IInterviewService _interviewService;
    private readonly Mock<IUserService> _userServiceMock = new ();
    private readonly Mock<IJobSeekerAccountQueryRepository> _jobSeekerQueryRepository = new();
    private readonly Mock<IJobQueryRepository> _jobQueryRepositoryMock = new();
    private readonly Mock<IEmployerAccountQueryRepository> _employerAccountQueryRepository = new();

    public InterviewServiceTests()
    {
        _interviewService = new InterviewService(_userServiceMock.Object, _jobSeekerQueryRepository.Object,
            _jobQueryRepositoryMock.Object, _employerAccountQueryRepository.Object);
    }
    
    [Fact]
    public async Task CreateInterviewShouldReturnCreatedInterview()
    {
        //Arrange
        var currentUserId = 1;
        var jobSeekerId = 1;
        var jobId = 1;
        _userServiceMock.Setup(u => u.GetCurrentUserId()).Returns(currentUserId);
        _employerAccountQueryRepository.Setup(r => r.GetEmployerWithJobs(currentUserId))
            .ReturnsAsync(EmployerAccountFixtures.EmployerAccountEntity);
        //Act
        var createdInterview = await _interviewService.PostInterview(jobId, jobSeekerId);
        //Assert
        Assert.Equal(jobSeekerId, createdInterview.JobSeekerAccountId);
        Assert.Equal(jobId, createdInterview.JobId);
        
    }

    [Fact]
    public async Task CreateInterviewShouldThrowForbiddenExceptionIfNotCurrentEmployerCreatedJob()
    {
        //Arrange
        var currentUserId = 1;
        var jobSeekerId = 1;
        var jobId = 2;
        _userServiceMock.Setup(u => u.GetCurrentUserId()).Returns(currentUserId);
        _employerAccountQueryRepository.Setup(r => r.GetEmployerWithJobs(currentUserId))
            .ReturnsAsync(EmployerAccountFixtures.EmployerAccountEntity);
        //Act & Assert
        await Assert.ThrowsAsync 
        <ForbiddenException>(async () => await _interviewService.PostInterview(jobId, jobSeekerId));
    }

    [Fact]
    public async Task DeleteInterviewShouldReturnInterviewToDelete()
    {
        //Arrange
        var currentUserId = 1;
        var jobSeekerId = 1;
        var jobId = 1;
        _userServiceMock.Setup(u => u.GetCurrentUserId()).Returns(currentUserId);
        _employerAccountQueryRepository.Setup(r => r.GetEmployerWithJobs(currentUserId))
            .ReturnsAsync(EmployerAccountFixtures.EmployerAccountEntity);
        //Act
        var interview = await  _interviewService.DeleteInterview(jobId, jobSeekerId);
        //Assert
        Assert.Equal(jobSeekerId, interview.JobSeekerAccountId);
        Assert.Equal(jobId, interview.JobId);
    }
    
    [Fact]
    public async Task DeleteInterviewShouldThrowForbiddenExceptionIfNotCurrentEmployerCreatedJob()
    {
        //Arrange
        var currentUserId = 1;
        var jobSeekerId = 1;
        var jobId = 2;
        _userServiceMock.Setup(u => u.GetCurrentUserId()).Returns(currentUserId);
        _employerAccountQueryRepository.Setup(r => r.GetEmployerWithJobs(currentUserId))
            .ReturnsAsync(EmployerAccountFixtures.EmployerAccountEntity);
        //Act & Assert
        await Assert.ThrowsAsync<ForbiddenException>(async () => await _interviewService.DeleteInterview(jobId, jobSeekerId));
    }
    
}