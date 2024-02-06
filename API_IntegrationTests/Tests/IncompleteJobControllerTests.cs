using System.Net;
using API_IntegrationTests.Fixtures;
using API_IntegrationTests.TestHelpers;
using ApplicationDomain.Enums;
using HelperJobby.DTOs.Job;
using Xunit.Abstractions;

namespace API_IntegrationTests.Tests;

public class IncompleteJobControllerTests : IntegrationTest
{
    private readonly string _baseUri = "/api/IncompleteJob";

    public IncompleteJobControllerTests(ITestOutputHelper testOutputHelper) : base(testOutputHelper)
    {
    }

    [Fact]
    public async Task GetEmployerIncompleteJobs_ShouldReturnJobCreationOfCurrentEmployer()
    {
        //Arrange
        var employer = await CreateEmployerWithNewOrganizationForAuthUser();
        var requestUri = $"{_baseUri}/{employer.Id}/incomplete-jobs";
        var currentJobCreation = await CreateNewCurrentJob(IncompleteJobFixtures.NewJobCreation);
        //Act
        var jobGetResponse = await TestClient.GetAsync(requestUri);
        await ExceptionsLogHelper.LogNotSuccessfulResponse(jobGetResponse, TestOutputHelper);
        //Assert
        Assert.Equal(HttpStatusCode.OK, jobGetResponse.StatusCode);
        var receivedCurrentJob = (await jobGetResponse.Content.ReadAsAsync<IEnumerable<IncompleteJobDTO>>()).ToList();
        Assert.Equal(currentJobCreation.Id, receivedCurrentJob[0].Id);
        Assert.Equal(currentJobCreation.JobTitle, receivedCurrentJob[0].JobTitle);
    }

    [Fact]
    public async Task StartJobCreation_ShouldReturnCreatedCurrentJob()
    {
        //Arrange
        var employer = await CreateEmployerWithNewOrganizationForAuthUser();
        var newCurrentJob = IncompleteJobFixtures.NewJobCreation;

        //Act
        var currentJobCreationResponse = await TestClient.PostAsJsonAsync(_baseUri, newCurrentJob);
        await ExceptionsLogHelper.LogNotSuccessfulResponse(currentJobCreationResponse, TestOutputHelper);

        //Assert
        Assert.Equal(HttpStatusCode.OK, currentJobCreationResponse.StatusCode);
        var currentJobCreation = await currentJobCreationResponse.Content.ReadAsAsync<IncompleteJobDTO>();
        Assert.NotEqual(0, currentJobCreation.Id);
        Assert.Equal(employer.Id, currentJobCreation.EmployerId);
        Assert.Equal(newCurrentJob.JobTitle, currentJobCreation.JobTitle);
    }

    [Fact]
    public async Task UpdateJobCreation_ShouldReturnUpdatedCurrentJob()
    {
        //Arrange
        var employer = await CreateEmployerWithNewOrganizationForAuthUser();
        var currentJobCreation = await CreateNewCurrentJob(IncompleteJobFixtures.NewJobCreation);
        var updatedJob = new UpdatedIncompleteJobDTO
        {
            JobTitle = "",
            NumberOfOpenings = 5,
            Language = "",
            Location = "",
            JobType = new List<JobTypes>(),
            Salary = new CreateUpdateSalaryDTO()
            {
                MinimalAmount = 0,
                SalaryRate = SalaryRates.PerYear,
                ShowPayByOption = ShowPayByOptions.MinimalAmount
            },
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
        var updatedCurrenJob = await updateResponse.Content.ReadAsAsync<IncompleteJobDTO>();
        Assert.NotEqual(0, updatedCurrenJob.Id);
        Assert.Equal(currentJobCreation.JobTitle, updatedCurrenJob.JobTitle);
        Assert.Equal(updatedJob.NumberOfOpenings, updatedCurrenJob.NumberOfOpenings);
        Assert.Equal(currentJobCreation.JobType.Count, updatedCurrenJob.JobType.Count);
        Assert.Equal(currentJobCreation.Salary.MinimalAmount, updatedCurrenJob.Salary.MinimalAmount);
        Assert.Equal(currentJobCreation.EmployerId, updatedCurrenJob.EmployerId);
        Assert.Equal(updatedJob.ContactEmail, updatedCurrenJob.ContactEmail);
        Assert.Equal(updatedJob.ResumeRequired, updatedCurrenJob.ResumeRequired);
    }

    [Fact]
    public async Task DeleteJobCreation_ShouldDeleteJobCreation()
    {
        //Arrange
        var employer = await CreateEmployerWithNewOrganizationForAuthUser();
        var currentJobCreation = await CreateNewCurrentJob(IncompleteJobFixtures.NewJobCreation);
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