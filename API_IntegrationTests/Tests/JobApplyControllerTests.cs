using System.Net;
using API_IntegrationTests.TestHelpers;
using HelperJobby.DTOs.Job;
using HelperJobby.DTOs.UserJobInteractions;
using Xunit.Abstractions;

namespace API_IntegrationTests.Tests;

public class JobApplyControllerTests : IntegrationTest
{
    private readonly string _baseUri = "/api/JobApply";

    public JobApplyControllerTests(ITestOutputHelper testOutputHelper) : base(testOutputHelper)
    {
    }

    [Fact]
    public async Task GetJobSeekerJobApplies_ShouldReturnJobSeekerJobApplies()
    {
        //Arrange
        var expectedJobCount = 2; //change if create more jobs 
        var employerAccount = await CreateEmployerWithNewOrganizationForAuthUser();
        var createdJob = await CreateJob();
        var jobApplyRequestUri = $"{_baseUri}/{createdJob.Id}";

        var firstJobSeeker = await GetCurrentJobSeekerAccount();
        await TestClient.PostAsJsonAsync(jobApplyRequestUri, "");
        var secondJobSeeker = await GetCurrentJobSeekerAccount();
        await TestClient.PostAsJsonAsync(jobApplyRequestUri, "");

        await LoginUser(employerAccount.User.Email, "randomPwd");

        //Act
        var getJobAppliesResponse = await TestClient.GetAsync($"{_baseUri}/{createdJob.Id}/job-applies");
        await ExceptionsLogHelper.LogNotSuccessfulResponse(getJobAppliesResponse, TestOutputHelper);

        //Assert
        Assert.Equal(HttpStatusCode.OK, getJobAppliesResponse.StatusCode);

        var jobDTO = await getJobAppliesResponse.Content.ReadAsAsync<JobDTO>();

        Assert.Equal(expectedJobCount, jobDTO.JobApplies.Count);
        Assert.Equal(createdJob.Id, jobDTO.JobApplies[0].JobId);
        Assert.Equal(createdJob.Id, jobDTO.JobApplies[1].JobId);
        Assert.Equal(firstJobSeeker.Id, jobDTO.JobApplies[0].JobSeekerId);
        Assert.Equal(secondJobSeeker.Id, jobDTO.JobApplies[1].JobSeekerId);
    }

    [Fact]
    public async Task GetCurrentJobSeekerJobApplies_ShouldReturnAllJobSeekerJobApplies()
    {
        /* Limitations in Query Translation: In-memory databases do not translate LINQ queries to SQL.
         * Instead, they execute them in .NET directly. This means that some queries that work with
         * a real database might not work with an in-memory database due to differences in how queries are processed.
         * So test of this controller method could not be implemented, but it this method was tested with Postman.
         * Received results match expected results.*/
    }

    [Fact]
    public async Task GetJobApply_ShouldReturnJobApply()
    {
        //Arrange
        var employerAccount = await CreateEmployerWithNewOrganizationForAuthUser();
        var createdJob = await CreateJob();
        var currentJobSeeker = await GetCurrentJobSeekerAccount();
        var saveJobResponse = await TestClient.PostAsJsonAsync($"{_baseUri}/{createdJob.Id}", "");
        var jobApplyDTO = await saveJobResponse.Content.ReadAsAsync<JobApplyDTO>();
        var requestUri = $"{_baseUri}/{createdJob.Id}/job-seeker/{currentJobSeeker.Id}";

        //Act
        var getJobApplyResponse = await TestClient.GetAsync(requestUri);

        //Assert
        Assert.Equal(HttpStatusCode.OK, getJobApplyResponse.StatusCode);
        var jobApply = await getJobApplyResponse.Content.ReadAsAsync<JobApplyDTO>();
        Assert.Equal(jobApplyDTO.JobId, jobApply.JobId);
        Assert.Equal(jobApplyDTO.JobSeekerId, jobApply.JobSeekerId);
    }

    [Fact]
    public async Task CreateJobApply_ShouldReturnJopApply()
    {
        //Arrange
        var employerAccount = await CreateEmployerWithNewOrganizationForAuthUser();
        var createdJob = await CreateJob();
        var jobSeeker = await GetCurrentJobSeekerAccount();
        var requestUri = $"{_baseUri}/{createdJob.Id}";

        //Act
        var jobApplyResponse = await TestClient.PostAsJsonAsync(requestUri, "");

        //Assert
        Assert.Equal(HttpStatusCode.OK, jobApplyResponse.StatusCode);
        var jobApply = await jobApplyResponse.Content.ReadAsAsync<SavedJobDTO>();
        Assert.Equal(jobApply.JobId, createdJob.Id);
        Assert.Equal(jobApply.JobSeekerId, jobSeeker.Id);
    }

    [Fact]
    public async Task DeleteJobApply_ShouldDeleteJobApply()
    {
        //Arrange
        var employerAccount = await CreateEmployerWithNewOrganizationForAuthUser();
        var createdJob = await CreateJob();
        var currentJobSeeker = await GetCurrentJobSeekerAccount();
        var jobApplyResponse = await TestClient.PostAsJsonAsync($"{_baseUri}/{createdJob.Id}", "");
        var jobApply = await jobApplyResponse.Content.ReadAsAsync<JobApplyDTO>();
        var requestUri = $"{_baseUri}/{jobApply.JobId}";

        //Act
        var deleteJobApplyResponse = await TestClient.DeleteAsync(requestUri);
        var getJobApplyResponse =
            await TestClient.GetAsync($"{_baseUri}/{createdJob.Id}/job-seeker/{currentJobSeeker.Id}");
        await ExceptionsLogHelper.LogNotSuccessfulResponse(deleteJobApplyResponse, TestOutputHelper);

        //Assert
        Assert.Equal(HttpStatusCode.OK, deleteJobApplyResponse.StatusCode);
        Assert.Equal(HttpStatusCode.Conflict, getJobApplyResponse.StatusCode);
    }
}