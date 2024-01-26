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
    public async Task GetJobAppliesForSpecifiedShouldReturnJob()
    {
        //Arrange
        var jobId = 1;
        var userId = 1;
        var employer = EmployerAccountFixtures.EmployerAccountEntity;
        var job = JobFixtures.FirstJobEntity;

        _userServiceMock.Setup(s => s.GetCurrentUserId()).Returns(userId);
        _employerAccountQueryRepository.Setup(r => r.GetEmployerAccount(userId))
            .ReturnsAsync(employer);
        _jobQueryRepositoryMock.Setup(r => r.GetJobById(jobId)).ReturnsAsync(job);

        //Act
        var jobForInterviews = await _interviewService.GetInterviewsForSpecificJob(jobId);

        //Assert
        Assert.Equal(job.Id, jobForInterviews.Id);
        Assert.Equal(job.JobTitle, jobForInterviews.JobTitle);
    }

    [Fact]
    public async Task GetJobAppliesShouldThrowAnExceptionIfNotJobEmployerTriesToGet()
    {
        //Arrange
        var jobId = 2;
        var userId = 1;
        var employer = EmployerAccountFixtures.EmployerAccountEntity;
        var job = JobFixtures.SecondJobEntity;

        _userServiceMock.Setup(s => s.GetCurrentUserId()).Returns(userId);
        _employerAccountQueryRepository.Setup(r => r.GetEmployerAccount(userId))
            .ReturnsAsync(employer);
        _jobQueryRepositoryMock.Setup(r => r.GetJobById(jobId)).ReturnsAsync(job);

        //Act && Assert
        await Assert.ThrowsAsync<ForbiddenException>(async () =>
            await _interviewService.GetInterviewsForSpecificJob(jobId));
    }
    
    [Fact]
    public async Task CreateInterviewShouldReturnCreatedInterview()
    {
        //Arrange
        var currentUserId = 1;
        var jobSeekerId = 1;
        var jobId = 1;
        var createdInterviewInfo = new Interview()
        {
            InterviewStart = DateTime.UtcNow
        };
        _interviewQueryRepositoryMock.Setup(r => r.GetInterviewByJobIdAndJobSeekerIdPlain(jobId, jobSeekerId))
            .ThrowsAsync(new InterviewOperatingException("Interview not found"));
        _userServiceMock.Setup(u => u.GetCurrentUserId()).Returns(currentUserId);
        _employerAccountQueryRepository.Setup(r => r.GetEmployerAccount(currentUserId))
            .ReturnsAsync(EmployerAccountFixtures.EmployerAccountEntity);
        _jobQueryRepositoryMock.Setup(r => r.GetJobById(jobId)).ReturnsAsync(JobFixtures.FirstJobEntity);
        //Act
        var createdInterview = await _interviewService.PostInterview(jobId, jobSeekerId, createdInterviewInfo);
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
        var createdInterviewInfo = new Interview()
        {
            InterviewStart = DateTime.UtcNow
        };
        _interviewQueryRepositoryMock.Setup(r => r.GetInterviewByJobIdAndJobSeekerIdPlain(jobId, jobSeekerId))
            .ThrowsAsync(new InterviewOperatingException("Interview not found"));
        _userServiceMock.Setup(u => u.GetCurrentUserId()).Returns(currentUserId);
        _employerAccountQueryRepository.Setup(r => r.GetEmployerAccount(currentUserId))
            .ReturnsAsync(EmployerAccountFixtures.EmployerAccountEntity);
        _jobQueryRepositoryMock.Setup(r => r.GetJobById(jobId)).ReturnsAsync(JobFixtures.SecondJobEntity);
        //Act & Assert
        await Assert.ThrowsAsync 
        <ForbiddenException>(async () => await _interviewService.PostInterview(jobId, jobSeekerId, createdInterviewInfo));
    }
    
    [Fact]
    public async Task CreateInterviewShouldThrowInvalidInterviewExceptionIfInterviewAlreadyExists()
    {
        //Arrange
        var jobSeekerId = 1;
        var jobId = 2;
        var createdInterviewInfo = new Interview()
        {
            InterviewStart = DateTime.UtcNow
        };
        _interviewQueryRepositoryMock.Setup(r => r.GetInterviewByJobIdAndJobSeekerIdPlain(jobId, jobSeekerId))
            .ReturnsAsync(new Interview()); 
        //Act & Assert
        await Assert.ThrowsAsync 
            <InterviewOperatingException>(async () => await _interviewService.PostInterview(jobId, jobSeekerId, createdInterviewInfo));
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