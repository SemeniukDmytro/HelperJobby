using System.Net;
using API_IntegrationTests.Fixtures;
using API_IntegrationTests.TestHelpers;
using ApplicationDomain.Enums;
using HelperJobby.DTOs.Job;
using Xunit.Abstractions;

namespace API_IntegrationTests.Tests;

public class CurrentJobControllerTests : IntegrationTest
{
    private readonly string _baseUri = "/api/CurrentJob";

    public CurrentJobControllerTests(ITestOutputHelper testOutputHelper) : base(testOutputHelper)
    {
    }

    [Fact]
    public async Task GetCurrentJobCreation_ShouldReturnJobCreationOfCurrentEmployer()
    {
        //Arrange
        var employer = await CreateEmployerWithNewOrganizationForAuthUser();
        var requestUri = $"{_baseUri}/{employer.Id}/current-job-creation";
        var currentJobCreation = await CreateNewCurrentJob(CurrentJobFixtures.NewJobCreation);
        //Act
        var jobGetResponse = await TestClient.GetAsync(requestUri);
        await ExceptionsLogHelper.LogNotSuccessfulResponse(jobGetResponse, TestOutputHelper);
        //Assert
        Assert.Equal(HttpStatusCode.OK, jobGetResponse.StatusCode);
        var receivedCurrentJob = await jobGetResponse.Content.ReadAsAsync<CurrentJobCreationDTO>();
        Assert.Equal(currentJobCreation.Id, receivedCurrentJob.Id);
        Assert.Equal(currentJobCreation.JobTitle, receivedCurrentJob.JobTitle);
    }

    [Fact]
    public async Task StartJobCreation_ShouldReturnCreatedCurrentJob()
    {
        //Arrange
        var employer = await CreateEmployerWithNewOrganizationForAuthUser();
        var newCurrentJob = CurrentJobFixtures.NewJobCreation;

        //Act
        var currentJobCreationResponse = await TestClient.PostAsJsonAsync(_baseUri, newCurrentJob);
        await ExceptionsLogHelper.LogNotSuccessfulResponse(currentJobCreationResponse, TestOutputHelper);

        //Assert
        Assert.Equal(HttpStatusCode.OK, currentJobCreationResponse.StatusCode);
        var currentJobCreation = await currentJobCreationResponse.Content.ReadAsAsync<CurrentJobCreationDTO>();
        Assert.NotEqual(0, currentJobCreation.Id);
        Assert.Equal(employer.Id, currentJobCreation.EmployerAccountId);
        Assert.Equal(newCurrentJob.JobTitle, currentJobCreation.JobTitle);
    }

    [Fact]
    public async Task UpdateJobCreation_ShouldReturnUpdatedCurrentJob()
    {
        //Arrange
        var employer = await CreateEmployerWithNewOrganizationForAuthUser();
        var currentJobCreation = await CreateNewCurrentJob(CurrentJobFixtures.NewJobCreation);
        var updatedJob = new CurrentJobCreateDTO
        {
            JobTitle = "",
            NumberOfOpenings = 5,
            Language = "",
            Location = "",
            JobType = new List<JobTypes>(),
            Salary = 0,
            SalaryRate = "per hour",
            ShowPayBy = "",
            Schedule = new List<Schedules>(),
            Benefits = new List<EmployeeBenefits>(),
            ContactEmail = "contactemail@gmail.com",
            ResumeRequired = false,
            Description = ""
        };
        var requestUri = $"{_baseUri}/{currentJobCreation.Id}";
        //Act
        var updateResponse = await TestClient.PutAsJsonAsync(requestUri, updatedJob);
        await ExceptionsLogHelper.LogNotSuccessfulResponse(updateResponse, TestOutputHelper);
        //Assert
        Assert.Equal(HttpStatusCode.OK, updateResponse.StatusCode);
        var updatedCurrenJob = await updateResponse.Content.ReadAsAsync<CurrentJobCreationDTO>();
        Assert.NotEqual(0, updatedCurrenJob.Id);
        Assert.Equal(currentJobCreation.JobTitle, updatedCurrenJob.JobTitle);
        Assert.Equal(updatedJob.NumberOfOpenings, updatedCurrenJob.NumberOfOpenings);
        Assert.Equal(currentJobCreation.JobType.Count, updatedCurrenJob.JobType.Count);
        Assert.Equal(currentJobCreation.Salary, updatedCurrenJob.Salary);
        Assert.Equal(currentJobCreation.EmployerAccountId, updatedCurrenJob.EmployerAccountId);
        Assert.Equal(updatedJob.ContactEmail, updatedCurrenJob.ContactEmail);
        Assert.Equal(updatedJob.ResumeRequired, updatedCurrenJob.ResumeRequired);
    }

    [Fact]
    public async Task DeleteJobCreation_ShouldDeleteJobCreation()
    {
        //Arrange
        var employer = await CreateEmployerWithNewOrganizationForAuthUser();
        var currentJobCreation = await CreateNewCurrentJob(CurrentJobFixtures.NewJobCreation);
        var requestUri = $"{_baseUri}/{currentJobCreation.Id}";
        //Act
        var jobDeleteResponse = await TestClient.DeleteAsync(requestUri);
        await ExceptionsLogHelper.LogNotSuccessfulResponse(jobDeleteResponse, TestOutputHelper);
        //Assert
        Assert.Equal(HttpStatusCode.OK, jobDeleteResponse.StatusCode);
        var jobGetResponse = await TestClient.GetAsync($"{_baseUri}/{employer.Id}/current-job-creation");
        await ExceptionsLogHelper.LogNotSuccessfulResponse(jobGetResponse, TestOutputHelper);
        Assert.Equal(HttpStatusCode.NotFound, jobGetResponse.StatusCode);
    }
}