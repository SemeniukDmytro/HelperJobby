using ApplicationBLL.Services;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;
using BLLUnitTests.Fixture;
using Moq;

namespace BLLUnitTests.ServicesTests;

public class InterviewServiceTests
{
    private readonly IInterviewService _interviewService;
    private readonly Mock<IUserService> _userServiceMock = new ();
    private readonly Mock<IInterviewQueryRepository> _interviewQueryRepositoryMock = new();
    private readonly Mock<IJobQueryRepository> _jobQueryRepositoryMock = new();
    private readonly Mock<IEmployerAccountQueryRepository> _employerAccountQueryRepository = new();

    public InterviewServiceTests()
    {
        _interviewService = new InterviewService(_userServiceMock.Object,
            _jobQueryRepositoryMock.Object, _employerAccountQueryRepository.Object, _interviewQueryRepositoryMock.Object);
    }
    
    [Fact]
    public async Task CreateInterviewShouldReturnCreatedInterview()
    {
        //Arrange
        var currentUserId = 1;
        var jobSeekerId = 1;
        var jobId = 1;
        _interviewQueryRepositoryMock.Setup(r => r.GetInterviewByJobIdAndJobSeekerIdPlain(jobId, jobSeekerId))
            .ThrowsAsync(new InvalidInterviewException("Interview not found"));
        _userServiceMock.Setup(u => u.GetCurrentUserId()).Returns(currentUserId);
        _employerAccountQueryRepository.Setup(r => r.GetEmployerAccount(currentUserId))
            .ReturnsAsync(EmployerAccountFixtures.EmployerAccountEntity);
        _jobQueryRepositoryMock.Setup(r => r.GetJobById(jobId)).ReturnsAsync(JobFixtures.FirstJobEntity);
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
        _interviewQueryRepositoryMock.Setup(r => r.GetInterviewByJobIdAndJobSeekerIdPlain(jobId, jobSeekerId))
            .ThrowsAsync(new InvalidInterviewException("Interview not found"));
        _userServiceMock.Setup(u => u.GetCurrentUserId()).Returns(currentUserId);
        _employerAccountQueryRepository.Setup(r => r.GetEmployerAccount(currentUserId))
            .ReturnsAsync(EmployerAccountFixtures.EmployerAccountEntity);
        _jobQueryRepositoryMock.Setup(r => r.GetJobById(jobId)).ReturnsAsync(JobFixtures.SecondJobEntity);
        //Act & Assert
        await Assert.ThrowsAsync 
        <ForbiddenException>(async () => await _interviewService.PostInterview(jobId, jobSeekerId));
    }
    
    [Fact]
    public async Task CreateInterviewShouldThrowInvalidInterviewExceptionIfInterviewAlreadyExists()
    {
        //Arrange
        var jobSeekerId = 1;
        var jobId = 2;
        _interviewQueryRepositoryMock.Setup(r => r.GetInterviewByJobIdAndJobSeekerIdPlain(jobId, jobSeekerId))
            .ReturnsAsync(new Interview()); 
        //Act & Assert
        await Assert.ThrowsAsync 
            <InvalidInterviewException>(async () => await _interviewService.PostInterview(jobId, jobSeekerId));
    }

    [Fact]
    public async Task DeleteInterviewShouldReturnInterviewToDelete()
    {
        //Arrange
        var currentUserId = 1;
        var jobSeekerId = 1;
        var jobId = 1;
        _interviewQueryRepositoryMock.Setup(r => r.GetInterviewWithJob(jobId, jobSeekerId))
            .ReturnsAsync(new Interview()
            {
                JobSeekerAccountId = jobSeekerId,
                JobId = jobId,
                Job = JobFixtures.FirstJobEntity
            }); 
        _userServiceMock.Setup(u => u.GetCurrentUserId()).Returns(currentUserId);
        _employerAccountQueryRepository.Setup(r => r.GetEmployerAccount(currentUserId))
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
        _interviewQueryRepositoryMock.Setup(r => r.GetInterviewWithJob(jobId, jobSeekerId))
            .ReturnsAsync(new Interview()
            {
                JobSeekerAccountId = jobSeekerId,
                JobId = jobId,
                Job = JobFixtures.SecondJobEntity
            }); 
        _userServiceMock.Setup(u => u.GetCurrentUserId()).Returns(currentUserId);
        _employerAccountQueryRepository.Setup(r => r.GetEmployerAccount(currentUserId))
            .ReturnsAsync(EmployerAccountFixtures.EmployerAccountEntity);
        //Act & Assert
        await Assert.ThrowsAsync<ForbiddenException>(async () => await _interviewService.DeleteInterview(jobId, jobSeekerId));
    }
}