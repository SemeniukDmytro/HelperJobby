using System.Net;
using API_IntegrationTests.Fixtures;
using API_IntegrationTests.TestHelpers;
using FluentAssertions;
using HelperJobby.DTOs.Account;
using HelperJobby.DTOs.Organization;
using Xunit.Abstractions;

namespace API_IntegrationTests.Tests;

public class OrganizationControllerTests : IntegrationTest
{
    private readonly string baseUri = "/api/organization";
    
    public OrganizationControllerTests(ITestOutputHelper testOutputHelper) : base(testOutputHelper)
    {
    }

    [Fact]
    public async Task GetOrganizationById_ShouldReturnOrganization()
    {
        //Arrange
        var employerAccount = await CreateEmployerWithNewOrganizationForAuthUser();
        string requestUri = $"{baseUri}/{employerAccount.Organization.Id}";
        
        //Act
        var organizationResponse = await TestClient.GetAsync(requestUri);
        await ExceptionsLogHelper.LogNotSuccessfulResponse(organizationResponse, TestOutputHelper);
        
        //Assert
        organizationResponse.StatusCode.Should().Be(HttpStatusCode.OK);
        var organization = await organizationResponse.Content.ReadAsAsync<OrganizationDTO>();
        Assert.Equal(employerAccount.Organization.Id, organization.Id);
        Assert.Equal(employerAccount.Organization.Name, organization.Name);
    }
    
    [Fact]
    public async Task UpdateOrganizationById_ShouldReturnUpdatedOrganization()
    {
        //Arrange
        var employerAccount = await CreateEmployerWithNewOrganizationForAuthUser();
        string requestUri = $"{baseUri}/{employerAccount.Organization.Id}";
        var updatedOrganization = new UpdateOrganizationDTO()
        {
            PhoneNumber = "+123456789",
            NumberOfEmployees = default
        };
        //Act
        var organizationResponse = await TestClient.PutAsJsonAsync(requestUri, updatedOrganization);
        await ExceptionsLogHelper.LogNotSuccessfulResponse(organizationResponse, TestOutputHelper);
        
        //Assert
        organizationResponse.StatusCode.Should().Be(HttpStatusCode.OK);
        var organization = await organizationResponse.Content.ReadAsAsync<OrganizationDTO>();
        Assert.Equal(employerAccount.Organization.Id, organization.Id);
        Assert.Equal(employerAccount.Organization.Name, organization.Name);
        Assert.Equal(updatedOrganization.PhoneNumber, organization.PhoneNumber);
        Assert.Equal(employerAccount.Organization.NumberOfEmployees, organization.NumberOfEmployees);
    }
    
    [Fact]
    public async Task AddEmployeeEmail_ShouldReturnCreatedEmail()
    {
        //Arrange
        var employerAccount = await CreateEmployerWithNewOrganizationForAuthUser();
        var newEmployeeEmail = new CreateOrganizationEmployeeEmailDTO()
        {
            Email = RandomStringGenerator.GenerateRandomEmail()
        };
        //Act
        var addEmailResponse = await TestClient.PostAsJsonAsync($"/api/organization/{employerAccount.Organization.Id}/add-employee",
            newEmployeeEmail);
        await ExceptionsLogHelper.LogNotSuccessfulResponse(addEmailResponse, TestOutputHelper);
        
        
        //Assert
        addEmailResponse.StatusCode.Should().Be(HttpStatusCode.OK);
        var email = await addEmailResponse.Content.ReadAsAsync<OrganizationEmployeeEmailDTO>();
        Assert.Equal(newEmployeeEmail.Email, email.Email);
        Assert.NotEqual(0, email.Id);
    }
    
    [Fact]
    public async Task RemoveEmployeeEmailShouldDeleteEmployerAccountAndEmployeeEmail()
    {
        //Arrange
        var employerAccount = await CreateEmployerWithNewOrganizationForAuthUser();
        var newEmployeeEmail = new CreateOrganizationEmployeeEmailDTO()
        {
            Email = RandomStringGenerator.GenerateRandomEmail()
        };
        var addEmailResponse = await TestClient.PostAsJsonAsync($"/api/organization/{employerAccount.Organization.Id}/add-employee",
            newEmployeeEmail);
        await ExceptionsLogHelper.LogNotSuccessfulResponse(addEmailResponse, TestOutputHelper);
        addEmailResponse.StatusCode.Should().Be(HttpStatusCode.OK);
        var email = await addEmailResponse.Content.ReadAsAsync<OrganizationEmployeeEmailDTO>();
        await AuthenticateAsync();
        var newEmployer = NewEmployerFixtures.EmployerCreationInCreatedOrganization;
        newEmployer.OrganizationName = employerAccount.Organization.Name;
        newEmployer.Email = email.Email;
        var employerResponse = await TestClient.PostAsJsonAsync("/api/employerAccount", newEmployer);
        await ExceptionsLogHelper.LogNotSuccessfulResponse(employerResponse, TestOutputHelper);
        var employerToRemove = await employerResponse.Content.ReadAsAsync<EmployerAccountDTO>();
        await LoginUser(employerAccount.User.Email, "randomPwd");
        var requestUri = $"{baseUri}/{email.Id}/remove-employee";
        
        //Act
        var removeEmployeeEmailResponse = await TestClient.PostAsJsonAsync(requestUri, email.Id);
        await ExceptionsLogHelper.LogNotSuccessfulResponse(removeEmployeeEmailResponse, TestOutputHelper);
        
        //Assert
        removeEmployeeEmailResponse.StatusCode.Should().Be(HttpStatusCode.OK);
        var removedEmployeeResponse = await TestClient.GetAsync($"/api/EmployerAccount/{employerToRemove.UserId}");
        await ExceptionsLogHelper.LogNotSuccessfulResponse(removedEmployeeResponse, TestOutputHelper);
        removedEmployeeResponse.StatusCode.Should().Be(HttpStatusCode.InternalServerError);
    }
}