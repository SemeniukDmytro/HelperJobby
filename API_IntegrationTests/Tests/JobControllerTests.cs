using System.Net;
using API_IntegrationTests.Fixtures;
using API_IntegrationTests.TestHelpers;
using ApplicationDomain.Enums;
using HelperJobby.DTOs.Job;
using Xunit.Abstractions;

namespace API_IntegrationTests.Tests;

public class JobControllerTests : IntegrationTest
{
    private readonly string _baseUri = "/api/job";

    public JobControllerTests(ITestOutputHelper testOutputHelper) : base(testOutputHelper)
    {
    }

    [Fact]
    public async Task GetJobsByOrganizationId_ShouldReturnIEnumerableOfJobs()
    {
        //Arrange
        var employer = await CreateEmployerWithNewOrganizationForAuthUser();
        var firstCreatedJob = await CreateJob();
        var secondCreatedJob = await CreateJob();
        var requestUri = $"{_baseUri}/organization-jobs/{employer.OrganizationId}";

        //Act
        var getJobsResponse = await TestClient.GetAsync(requestUri);
        await ExceptionsLogHelper.LogNotSuccessfulResponse(getJobsResponse, TestOutputHelper);

        //Assert
        Assert.Equal(HttpStatusCode.OK, getJobsResponse.StatusCode);
        var jobs = (await getJobsResponse.Content.ReadAsAsync<IEnumerable<JobDTO>>()).ToList();
        Assert.Equal(2, jobs.Count);
        Assert.Equal(jobs[0].Id, firstCreatedJob.Id);
        Assert.Equal(jobs[1].Id, secondCreatedJob.Id);
    }

    [Fact]
    public async Task GetJobsByUserId_ShouldReturnIEnumerableOfJobs()
    {
        //Arrange
        var employer = await CreateEmployerWithNewOrganizationForAuthUser();
        var firstCreatedJob = await CreateJob();
        var secondCreatedJob = await CreateJob();
        var requestUri = $"{_baseUri}/jobs/{employer.UserId}";

        //Act
        var getJobsResponse = await TestClient.GetAsync(requestUri);
        await ExceptionsLogHelper.LogNotSuccessfulResponse(getJobsResponse, TestOutputHelper);

        //Assert
        Assert.Equal(HttpStatusCode.OK, getJobsResponse.StatusCode);
        var jobs = (await getJobsResponse.Content.ReadAsAsync<IEnumerable<JobDTO>>()).ToList();
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
        Assert.Equal(HttpStatusCode.OK, getJobResponse.StatusCode);
        var job = await getJobResponse.Content.ReadAsAsync<JobDTO>();
        Assert.Equal(createdJob.Id, job.Id);
        Assert.Equal(createdJob.JobApplies, job.JobApplies);
    }

    [Fact]
    public async Task CreateNewJob_ShouldReturnCreatedJobAndDeleteCurrentJobCreationOfEmployer()
    {
        //Arrange
        var employer = await CreateEmployerWithNewOrganizationForAuthUser();
        var currentJobCreation = await CreateNewCurrentJob(IncompleteJobFixtures.CompletedJobCreation);
        var requestUri = $"/api/job/{currentJobCreation.Id}";

        //Act
        var jobCreateResponse = await TestClient.PostAsJsonAsync(requestUri, currentJobCreation.Id);
        await ExceptionsLogHelper.LogNotSuccessfulResponse(jobCreateResponse, TestOutputHelper);
        var currentJobGetResponse = await TestClient.GetAsync($"api/CurrentJob/{employer.Id}/current-job-creation");

        //Assert
        Assert.Equal(HttpStatusCode.OK, jobCreateResponse.StatusCode);
        Assert.Equal(HttpStatusCode.NotFound, currentJobGetResponse.StatusCode);
        var createdJob = await jobCreateResponse.Content.ReadAsAsync<JobDTO>();
        Assert.NotEqual(0, createdJob.Id);
        Assert.Equal(currentJobCreation.Benefits.Count, createdJob.Benefits.Count);
        Assert.Equal(currentJobCreation.Salary.MinimalAmount, createdJob.Salary.MinimalAmount);
        Assert.Equal(currentJobCreation.Description, createdJob.Description);
    }

    [Fact]
    public async Task UpdateJobShouldReturnUpdatedJob()
    {
        //Arrange
        var employer = await CreateEmployerWithNewOrganizationForAuthUser();
        var createdJob = await CreateJob();
        var requestUri = $"{_baseUri}/{createdJob.Id}";
        var updatedJobDTO = new UpdatedJobDTO
        {
            JobTitle = "Software Engineer",
            NumberOfOpenings = 3,
            Language = "C#",
            Location = "New York",
            JobType = new List<JobTypes> { JobTypes.FullTime },
            Salary = new CreateUpdateSalaryDTO()
            {
                MinimalAmount = 90000.00m,
                SalaryRate = SalaryRates.PerYear,
                ShowPayByOption = ShowPayByOptions.StartingAmount
            },
            Schedule = new List<Schedules> { Schedules.MondayToFriday },
            Benefits = new List<EmployeeBenefits>(),
            ContactEmail = "hr@gmail.com",
            ResumeRequired = ResumeRequirementOptions.Optional,
            Description = "We are looking for experienced software engineers to join our team."
        };

        //Act
        var updateJobResponse = await TestClient.PutAsJsonAsync(requestUri, updatedJobDTO);
        await ExceptionsLogHelper.LogNotSuccessfulResponse(updateJobResponse, TestOutputHelper);

        //Assert
        Assert.Equal(HttpStatusCode.OK, updateJobResponse.StatusCode);
        var updatedJob = await updateJobResponse.Content.ReadAsAsync<JobDTO>();
        Assert.Equal(createdJob.Id, updatedJob.Id);
        Assert.Equal(updatedJobDTO.JobTitle, updatedJob.JobTitle);
        Assert.Equal(updatedJobDTO.NumberOfOpenings, updatedJob.NumberOfOpenings);
        Assert.Equal(updatedJobDTO.Language, updatedJob.Language);
        Assert.Equal(updatedJobDTO.Location, updatedJob.Location);
        Assert.Equal(updatedJobDTO.JobType.Select(j => j.ToString()), updatedJob.JobType);
        Assert.Equal(updatedJobDTO.Salary.MinimalAmount, updatedJob.Salary.MinimalAmount);
        Assert.Equal(updatedJobDTO.Schedule.Select(s => s.ToString()), updatedJob.Schedule);
        Assert.Equal(updatedJobDTO.Benefits.Select(b => b.ToString()), updatedJob.Benefits);
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
        Assert.Equal(HttpStatusCode.OK, deleteJobResponse.StatusCode);
        Assert.Equal(HttpStatusCode.NotFound, getJobResponse.StatusCode);
    }
}