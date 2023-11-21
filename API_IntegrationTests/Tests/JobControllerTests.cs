using System.Net;
using API_IntegrationTests.Fixtures;
using API_IntegrationTests.TestHelpers;
using ApplicationDomain.Enums;
using FluentAssertions;
using HelperJobby.DTOs.Job;
using Microsoft.IdentityModel.Logging;
using Xunit.Abstractions;

namespace API_IntegrationTests.Tests;

public class JobControllerTests : IntegrationTest
{
    private readonly string _baseUri = "/api/job";
    public JobControllerTests(ITestOutputHelper testOutputHelper) : base(testOutputHelper)
    {
    }
    
    [Fact]
    public async Task GetJobByOrganizationId_ShouldReturnJob()
    {
        //Arrange
        var employer = await CreateEmployerWithNewOrganizationForAuthUser();
        var firstCreatedJob = await CreateJob();
        var secondCreatedJob = await CreateJob();
        var requestUri = $"{_baseUri}/organization-jobs/{employer.OrganizationId}";
        
        //Act
        var getJobResponse = await TestClient.GetAsync(requestUri);
        await ExceptionsLogHelper.LogNotSuccessfulResponse(getJobResponse, TestOutputHelper);
        
        //Assert
        getJobResponse.StatusCode.Should().Be(HttpStatusCode.OK);
        var jobs = (await getJobResponse.Content.ReadAsAsync<IEnumerable<JobDTO>>()).ToList();
        Assert.Equal(2, jobs.Count);
        Assert.Equal(jobs[0].Id, firstCreatedJob.Id);
        Assert.Equal(jobs[1].Id, secondCreatedJob.Id);
    }

    [Fact]
    public async Task GetJobByUserId_ShouldReturnJob()
    {
        //Arrange
        var employer = await CreateEmployerWithNewOrganizationForAuthUser();
        var firstCreatedJob = await CreateJob();
        var secondCreatedJob = await CreateJob();
        var requestUri = $"{_baseUri}/jobs/{employer.UserId}";
        
        //Act
        var getJobResponse = await TestClient.GetAsync(requestUri);
        await ExceptionsLogHelper.LogNotSuccessfulResponse(getJobResponse, TestOutputHelper);
        
        //Assert
        getJobResponse.StatusCode.Should().Be(HttpStatusCode.OK);
        var jobs = (await getJobResponse.Content.ReadAsAsync<IEnumerable<JobDTO>>()).ToList();
        Assert.Equal(2, jobs.Count);
        Assert.Equal(jobs[0].Id, firstCreatedJob.Id);
        Assert.Equal(jobs[1].Id, secondCreatedJob.Id);
    }
    
    [Fact]
    public async Task GetJob_ShouldReturnJob()
    {
        //Arrange
        var employer = await CreateEmployerWithNewOrganizationForAuthUser();
        var createdJob = await CreateJob();
        var requestUri = $"{_baseUri}/{createdJob.Id}";
        
        //Act
        var getJobResponse = await TestClient.GetAsync(requestUri);
        await ExceptionsLogHelper.LogNotSuccessfulResponse(getJobResponse, TestOutputHelper);
        
        //Assert
        getJobResponse.StatusCode.Should().Be(HttpStatusCode.OK);
        var job = await getJobResponse.Content.ReadAsAsync<JobDTO>();
        Assert.Equal(createdJob.Id, job.Id);
        Assert.Equal(createdJob.JobApplies, job.JobApplies);
    }

    [Fact]
    public async Task CreateNewJob_ShouldReturnCreatedJobAndDeleteCurrentJobCreationOfEmployer()
    {
        //Arrange
        var employer = await CreateEmployerWithNewOrganizationForAuthUser();
        var currentJobCreation = await CreateNewCurrentJob(CurrentJobFixtures.CompletedJobCreation);
        var requestUri = $"/api/job/create-job/{currentJobCreation.Id}";
        
        //Act
        var jobCreateResponse = await TestClient.PostAsJsonAsync(requestUri, currentJobCreation.Id);
        await ExceptionsLogHelper.LogNotSuccessfulResponse(jobCreateResponse, TestOutputHelper);
        var currentJobGetResponse = await TestClient.GetAsync($"api/CurrentJob/{employer.Id}/current-job-creation");
        await ExceptionsLogHelper.LogNotSuccessfulResponse(currentJobGetResponse, TestOutputHelper);

        //Assert
        jobCreateResponse.StatusCode.Should().Be(HttpStatusCode.OK);
        currentJobGetResponse.StatusCode.Should().Be(HttpStatusCode.InternalServerError);
        var createdJob = await jobCreateResponse.Content.ReadAsAsync<JobDTO>();
        Assert.NotEqual(0, createdJob.Id);
        Assert.Equal(currentJobCreation.Benefits.Count, createdJob.Benefits.Count);
        Assert.Equal(currentJobCreation.Salary, createdJob.Salary);
        Assert.Equal(currentJobCreation.Description, createdJob.Description);
    }

    [Fact]
    public async Task UpdateJobShouldReturnUpdatedJob()
    {
        //Arrange
        var employer = await CreateEmployerWithNewOrganizationForAuthUser();
        var createdJob = await CreateJob();
        var requestUri = $"{_baseUri}/{createdJob.Id}";
        UpdatedJobDTO updatedJobDTO = new UpdatedJobDTO()
        {
            JobTitle = "Software Engineer",
            NumberOfOpenings = 3,
            Language = "C#",
            Location = "New York",
            JobType = new List<JobTypes> { JobTypes.FullTime, },
            Salary = 80000.0m,
            Schedule = new List<Schedules> { Schedules.MondayToFriday },
            Benefits = new List<EmployeeBenefits> {},
            ContactEmail = "hr@gmail.com",
            ResumeRequired = true,
            Description = "We are looking for experienced software engineers to join our team."
        };
        
        //Act
        var updateJobResponse = await TestClient.PutAsJsonAsync(requestUri, updatedJobDTO);
        await ExceptionsLogHelper.LogNotSuccessfulResponse(updateJobResponse, TestOutputHelper);
        
        //Assert
        updateJobResponse.StatusCode.Should().Be(HttpStatusCode.OK);
        var updatedJob = await updateJobResponse.Content.ReadAsAsync<JobDTO>();
        Assert.Equal(createdJob.Id, updatedJob.Id);
        Assert.Equal(updatedJobDTO.JobTitle, updatedJob.JobTitle);
        Assert.Equal(updatedJobDTO.NumberOfOpenings, updatedJob.NumberOfOpenings);
        Assert.Equal(updatedJobDTO.Language, updatedJob.Language);
        Assert.Equal(updatedJobDTO.Location, updatedJob.Location);
        Assert.Equal(updatedJobDTO.JobType, updatedJob.JobType);
        Assert.Equal(updatedJobDTO.Salary, updatedJob.Salary);
        Assert.Equal(updatedJobDTO.Schedule, updatedJob.Schedule);
        Assert.Equal(updatedJobDTO.Benefits, updatedJob.Benefits);
        Assert.Equal(updatedJobDTO.ContactEmail, updatedJob.ContactEmail);
        Assert.Equal(updatedJobDTO.ResumeRequired, updatedJob.ResumeRequired);
        Assert.Equal(updatedJobDTO.Description, updatedJob.Description);
    }

    [Fact]
    public async Task DeleteJob_ShouldDeleteJob()
    {
        //Arrange
        var employer = await CreateEmployerWithNewOrganizationForAuthUser();
        var createdJob = await CreateJob();
        var requestUri = $"{_baseUri}/{createdJob.Id}";
        
        //Act
        var deleteJobResponse = await TestClient.DeleteAsync(requestUri);
        await ExceptionsLogHelper.LogNotSuccessfulResponse(deleteJobResponse, TestOutputHelper);
        var getJobResponse = await TestClient.GetAsync(requestUri);
        
        //Assert
        deleteJobResponse.StatusCode.Should().Be(HttpStatusCode.OK);
        getJobResponse.StatusCode.Should().Be(HttpStatusCode.InternalServerError);

    }
}