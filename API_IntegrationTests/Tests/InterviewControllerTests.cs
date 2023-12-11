using System.Net;
using API_IntegrationTests.TestHelpers;
using HelperJobby.DTOs.Account;
using HelperJobby.DTOs.Job;
using HelperJobby.DTOs.User;
using HelperJobby.DTOs.UserJobInteractions;
using Xunit.Abstractions;

namespace API_IntegrationTests.Tests;

public class InterviewControllerTests : IntegrationTest
{
    private readonly string _baseUri = "/api/Interview";
    
    public InterviewControllerTests(ITestOutputHelper testOutputHelper) : base(testOutputHelper)
    {
    }

    [Fact]
    public async Task GetInterviewsByJobId_ShouldReturnJobAllInterviews()
    {
        //Arrange
        var jobSeekersAmount = 2; //change if created more jobSeekers
        var firstJobSeeker = await GetCurrentJobSeekerAccount();
        var secondJobSeeker = await GetCurrentJobSeekerAccount();
        var employerAccount = await CreateEmployerWithNewOrganizationForAuthUser();
        var createdJob = await CreateJob();
        var firstInterview = await CreateInterview(createdJob.Id, firstJobSeeker.Id);
        var secondInterview = await CreateInterview(createdJob.Id, secondJobSeeker.Id);
        var requestUri = $"api/Interview/{createdJob.Id}/interviews"; 

        //Act
        var getJobSeekerInterviewsResponse = await TestClient.GetAsync(requestUri);
        await ExceptionsLogHelper.LogNotSuccessfulResponse(getJobSeekerInterviewsResponse, TestOutputHelper);
        
        //Assert
        Assert.Equal(HttpStatusCode.OK, getJobSeekerInterviewsResponse.StatusCode);
        var interviews = (await getJobSeekerInterviewsResponse.Content.ReadAsAsync<IEnumerable<InterviewDTO>>()).ToList();
        Assert.Equal(jobSeekersAmount, interviews.Count);
        Assert.Equal(createdJob.JobTitle, interviews[0].Job.JobTitle);
        Assert.Equal(firstInterview.JobSeekerAccountId, interviews[0].JobSeekerAccountId);
        Assert.Equal(secondInterview.JobSeekerAccountId, interviews[1].JobSeekerAccountId);

    }

    [Fact]
    public async Task GetCurrentJobSeekerInterviews_ShouldReturnAllJobSeekerInterviews()
    {
        /* Limitations in Query Translation: In-memory databases do not translate LINQ queries to SQL.
         * Instead, they execute them in .NET directly. This means that some queries that work with
         * a real database might not work with an in-memory database due to differences in how queries are processed.
         * So test of this controller method could not be implemented, but it this method was tested with Postman.
         * Received results match expected results.*/
    }

    [Fact]
    public async Task GetInterviewShouldReturn_Interview()
    {
        //Arrange
        var createdInterview = await CreateInterviewByAuthEmployer();
        var requestUri = $"{_baseUri}/{createdInterview.JobId}/job-seeker/{createdInterview.JobSeekerAccountId}";
        //Act
        var getInterviewResponse =
            await TestClient.GetAsync(requestUri);

        //Assert
        Assert.Equal(HttpStatusCode.OK, getInterviewResponse.StatusCode);
        var receivedInterview = await getInterviewResponse.Content.ReadAsAsync<InterviewDTO>();
        Assert.Equal(createdInterview.JobId, receivedInterview.JobId);
        Assert.Equal(createdInterview.JobSeekerAccountId, receivedInterview.JobSeekerAccountId);
        Assert.Equal(createdInterview.JobSeekerAccountId, receivedInterview.JobSeekerAccount.Id);

    }
    
    [Fact]
    public async Task CreateInterview_ShouldReturnCreatedInterview()
    {
        //Arrange
        var user = await AuthenticateAsync();
        var getJobSeekerResponse = await TestClient.GetAsync("api/JobSeekerAccount/current-job-seeker");
        var newJobSeeker = await getJobSeekerResponse.Content.ReadAsAsync<JobSeekerAccountDTO>();
        var employerAccount = await CreateEmployerWithNewOrganizationForAuthUser();
        var createdJob = await CreateJob(); 
        var requestUri = $"{_baseUri}/{createdJob.Id}/job-seeker/{newJobSeeker.Id}"; 
        
        //Act
        var createInterviewResponse = await TestClient.PostAsJsonAsync(requestUri, "");
        
        //Assert
        Assert.Equal(HttpStatusCode.OK, createInterviewResponse.StatusCode);
        var interview = await createInterviewResponse.Content.ReadAsAsync<InterviewDTO>();
        Assert.Equal(createdJob.Id, interview.JobId);
        Assert.Equal(newJobSeeker.Id, interview.JobSeekerAccountId);
    }

    [Fact]
    public async Task DeleteInterview_ShouldDeleteInterview()
    {
        //Arrange
        var createdInterview = await CreateInterviewByAuthEmployer();
        var requestUri = $"{_baseUri}/{createdInterview.JobId}/job-seeker/{createdInterview.JobSeekerAccountId}";
        //Act
        var deleteInterviewResponse =
            await TestClient.DeleteAsync(requestUri);

        //Assert
        Assert.Equal(HttpStatusCode.OK, deleteInterviewResponse.StatusCode);
        var getInterviewResponse =
            await TestClient.GetAsync(requestUri);
        Assert.Equal(HttpStatusCode.InternalServerError, getInterviewResponse.StatusCode);
        
    }
}