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
    private readonly Mock<IInterviewQueryRepository> _interviewQueryRepositoryMock = new();
    private readonly Mock<IJobQueryRepository> _jobQueryRepositoryMock = new();
    private readonly Mock<IJobSeekerQueryRepository> _jobSeekerQueryRepositoryMock = new();
    private readonly Mock<IEmployerService> _employerServiceMock = new();
    private readonly Mock<IJobSeekerService> _jobSeekerServiceMock = new();

    public InterviewServiceTests()
    {
        _interviewService = new InterviewService(_jobQueryRepositoryMock.Object,
            _interviewQueryRepositoryMock.Object,
            _jobSeekerQueryRepositoryMock.Object,
            _employerServiceMock.Object,
            _jobSeekerServiceMock.Object);
    }


    [Fact]
    public async Task GetInterviewForSpecifiedShouldReturnJob()
    {
        //Arrange
        var jobId = 1;
        var job = JobFixtures.FirstJobEntity;
        var employerId = 1;
        _employerServiceMock.Setup(us => us.GetCurrentEmployerId()).Returns(employerId);
        
        _jobQueryRepositoryMock.Setup(r => r.GetJobWithInterviews(jobId)).ReturnsAsync(job);

        //Act
        var jobForInterviews = await _interviewService.GetInterviewsForSpecificJob(jobId);

        //Assert
        Assert.Equal(job.Id, jobForInterviews.Id);
        Assert.Equal(job.JobTitle, jobForInterviews.JobTitle);
    }

    [Fact]
    public async Task GetInterviewsShouldThrowAnExceptionIfNotJobEmployerTriesToGet()
    {
        //Arrange
        var jobId = 2;
        var job = JobFixtures.SecondJobEntity;

        var employerId = 1;
        _employerServiceMock.Setup(us => us.GetCurrentEmployerId()).Returns(employerId);
        _jobQueryRepositoryMock.Setup(r => r.GetJobWithInterviews(jobId)).ReturnsAsync(job);

        //Act && Assert
        await Assert.ThrowsAsync<ForbiddenException>(async () =>
            await _interviewService.GetInterviewsForSpecificJob(jobId));
    }

    [Fact]
    public async Task CreateInterviewShouldReturnCreatedInterview()
    {
        //Arrange
        var employerId = 1;
        var jobSeekerId = 1;
        var jobId = 1;
        var createdInterviewInfo = new Interview
        {
            InterviewStart = DateTime.UtcNow,
            InterviewEnd = TimeOnly.FromDateTime(DateTime.UtcNow).Add(TimeOnly.FromTimeSpan(TimeSpan.FromHours(1)).ToTimeSpan())
        };
        _interviewQueryRepositoryMock.Setup(r => r.GetInterviewByJobIdAndJobSeekerIdPlain(jobId, jobSeekerId))
            .ThrowsAsync(new InterviewOperatingException("Interview not found"));
        _employerServiceMock.Setup(us => us.GetCurrentEmployerId()).Returns(employerId);
        _jobQueryRepositoryMock.Setup(r => r.GetJobByIdForEmployers(jobId)).ReturnsAsync(JobFixtures.FirstJobEntity);
        //Act
        var createdInterview = await _interviewService.PostInterview(jobId, jobSeekerId, createdInterviewInfo);
        //Assert
        Assert.Equal(jobSeekerId, createdInterview.JobSeekerId);
        Assert.Equal(jobId, createdInterview.JobId);
    }

    [Fact]
    public async Task CreateInterviewShouldThrowForbiddenExceptionIfNotCurrentEmployerCreatedJob()
    {
        //Arrange
        var employerId = 1;
        var jobSeekerId = 1;
        var jobId = 2;
        var createdInterviewInfo = new Interview
        {
            InterviewStart = DateTime.UtcNow
        };
        _employerServiceMock.Setup(us => us.GetCurrentEmployerId()).Returns(employerId);
        _interviewQueryRepositoryMock.Setup(r => r.GetInterviewByJobIdAndJobSeekerIdPlain(jobId, jobSeekerId))
            .ThrowsAsync(new InterviewOperatingException("Interview not found"));
        _jobQueryRepositoryMock.Setup(r => r.GetJobByIdForEmployers(jobId)).ReturnsAsync(JobFixtures.SecondJobEntity);
        //Act & Assert
        await Assert.ThrowsAsync
            <ForbiddenException>(async () =>
                await _interviewService.PostInterview(jobId, jobSeekerId, createdInterviewInfo));
    }

    [Fact]
    public async Task CreateInterviewShouldThrowInvalidInterviewExceptionIfInterviewAlreadyExists()
    {
        //Arrange
        var jobSeekerId = 1;
        var jobId = 2;
        var createdInterviewInfo = new Interview
        {
            InterviewStart = DateTime.UtcNow
        };
        _interviewQueryRepositoryMock.Setup(r => r.GetInterviewByJobIdAndJobSeekerIdPlain(jobId, jobSeekerId))
            .ReturnsAsync(new Interview());
        //Act & Assert
        await Assert.ThrowsAsync
            <InterviewOperatingException>(async () =>
                await _interviewService.PostInterview(jobId, jobSeekerId, createdInterviewInfo));
    }

    [Fact]
    public async Task DeleteInterviewShouldReturnInterviewToDelete()
    {
        //Arrange
        var employerId = 1;
        var jobSeekerId = 1;
        var jobId = 1;
        _interviewQueryRepositoryMock.Setup(r => r.GetInterviewWithJob(jobId, jobSeekerId))
            .ReturnsAsync(new Interview
            {
                JobSeekerId = jobSeekerId,
                JobId = jobId,
                Job = JobFixtures.FirstJobEntity
            });
        _employerServiceMock.Setup(us => us.GetCurrentEmployerId()).Returns(employerId);
        //Act
        var interview = await _interviewService.CancelInterviewFromEmployerAccount(jobId, jobSeekerId);
        //Assert
        Assert.Equal(jobSeekerId, interview.JobSeekerId);
        Assert.Equal(jobId, interview.JobId);
    }

    [Fact]
    public async Task DeleteInterviewShouldThrowForbiddenExceptionIfNotCurrentEmployerCreatedJob()
    {
        //Arrange
        var employerId = 1;
        var jobSeekerId = 1;
        var jobId = 2;
        _interviewQueryRepositoryMock.Setup(r => r.GetInterviewWithJob(jobId, jobSeekerId))
            .ReturnsAsync(new Interview
            {
                JobSeekerId = jobSeekerId,
                JobId = jobId,
                Job = JobFixtures.SecondJobEntity
            });
        _employerServiceMock.Setup(us => us.GetCurrentEmployerId()).Returns(employerId);
        //Act & Assert
        await Assert.ThrowsAsync<ForbiddenException>(async () =>
            await _interviewService.CancelInterviewFromEmployerAccount(jobId, jobSeekerId));
    }
}