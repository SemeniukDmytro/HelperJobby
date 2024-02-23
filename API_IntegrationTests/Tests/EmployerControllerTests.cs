using System.Net;
using API_IntegrationTests.Fixtures;
using API_IntegrationTests.TestHelpers;
using HelperJobby.DTOs.Account;
using Xunit.Abstractions;

namespace API_IntegrationTests.Tests;

public class EmployerControllerTests : IntegrationTest
{
    public EmployerControllerTests(ITestOutputHelper testOutputHelper) : base(testOutputHelper)
    {
    }

    [Fact]
    public async Task
        CreateEmployer_ShouldReturnCreatedEmployerAndCreateNewOrganization_IfOrganizationDoesNotExist()
    {
        //Arrange
        await AuthenticateAsync();
        var requestUri = "/api/employer";
        var createdEmployer = NewEmployerFixtures.EmployerWithRandomOrganization;

        //Act
        var employerCreationResponse = await TestClient.PostAsJsonAsync(requestUri, createdEmployer);
        await ExceptionsLogHelper.LogNotSuccessfulResponse(employerCreationResponse, TestOutputHelper);

        //Assert
        Assert.Equal(HttpStatusCode.OK, employerCreationResponse.StatusCode);
        var employer = await employerCreationResponse.Content.ReadAsAsync<EmployerDTO>();
        Assert.NotEqual(0, employer.Id);
        Assert.NotEqual(0, employer.Organization.Id);
        Assert.Equal(employer.Email, createdEmployer.Email);
        Assert.Equal(createdEmployer.OrganizationName, employer.Organization.Name);
    }

    [Fact]
    public async Task CreateEmployer_ShouldReturnCreatedEmployer_IfEmployerEmailIsInOrganizationEmailsList()
    {
        //Arrange
        var requestUri = "/api/employer";
        var employerWithCreatedOrganization = await CreateEmployerWithNewOrganizationForAuthUser();
        TestOutputHelper.WriteLine(employerWithCreatedOrganization.Organization.EmployeeEmails[0].Email);
        await TestClient.PostAsJsonAsync(
            $"/api/organization/{employerWithCreatedOrganization.Organization.Id}/add-employee",
            EmployeeEmailsFixtures.emailForAdding);
        await AuthenticateAsync();
        var newEmployer = NewEmployerFixtures.EmployerCreationInCreatedOrganization;
        newEmployer.OrganizationName = employerWithCreatedOrganization.Organization.Name;
        TestOutputHelper.WriteLine(newEmployer.Email);

        //Act
        var employerCreationResponse = await TestClient.PostAsJsonAsync(requestUri, newEmployer);
        await ExceptionsLogHelper.LogNotSuccessfulResponse(employerCreationResponse, TestOutputHelper);

        //Assert
        Assert.Equal(HttpStatusCode.OK, employerCreationResponse.StatusCode);
        var employer = await employerCreationResponse.Content.ReadAsAsync<EmployerDTO>();
        Assert.NotEqual(0, employer.Id);
        Assert.NotEqual(0, employer.Organization.Id);
        Assert.Equal(newEmployer.Email, employer.Email);
        Assert.Equal(newEmployer.OrganizationName, employerWithCreatedOrganization.Organization.Name);
    }

    [Fact]
    public async Task UpdateEmployer_ShouldReturnUpdatedEmployer()
    {
        //Arrange
        var currentEmployer = await CreateEmployerWithNewOrganizationForAuthUser();
        var requestUri = $"/api/employer/{currentEmployer.Id}";
        var updateEmployerAccountDTO = new UpdateEmployerDTO
        {
            Email = "newemail@gmail.com",
            ContactNumber = ""
        };

        //Act
        var updateEmployerResponse = await TestClient.PutAsJsonAsync(requestUri, updateEmployerAccountDTO);
        await ExceptionsLogHelper.LogNotSuccessfulResponse(updateEmployerResponse, TestOutputHelper);

        //Assert
        Assert.Equal(HttpStatusCode.OK, updateEmployerResponse.StatusCode);
        var updatedEmployer = await updateEmployerResponse.Content.ReadAsAsync<EmployerDTO>();
        Assert.Equal(currentEmployer.Id, updatedEmployer.Id);
        Assert.Equal(currentEmployer.ContactNumber, updatedEmployer.ContactNumber);
        Assert.Equal(currentEmployer.UserId, updatedEmployer.UserId);
        Assert.Equal(updateEmployerAccountDTO.Email, updatedEmployer.Email);
    }

    [Fact]
    public async Task GetCurrentEmployer_ShouldReturnEmployerAccount()
    {
        //Arrange
        var createdEmployer = await CreateEmployerWithNewOrganizationForAuthUser();
        var requestUri = "/api/Employer/my-employer-account";

        //Act
        var getEmployerResponse = await TestClient.GetAsync(requestUri);
        await ExceptionsLogHelper.LogNotSuccessfulResponse(getEmployerResponse, TestOutputHelper);

        //Assert
        Assert.Equal(HttpStatusCode.OK, getEmployerResponse.StatusCode);
        var employer = await getEmployerResponse.Content.ReadAsAsync<EmployerDTO>();
        Assert.Equal(createdEmployer.Id, employer.Id);
        Assert.Equal(createdEmployer.Email, employer.Email);
    }
}