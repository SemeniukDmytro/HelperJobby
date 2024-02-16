using ApplicationDomain.Models;

namespace BLLUnitTests.Fixture;

public static class EmployerFixtures
{
    public static Employer EmployerEntity = new()
    {
        Id = 1,
        FullName = "test name",
        Email = "test@gmail.com",
        UserId = 1,
        Jobs = new List<Job>
        {
            JobFixtures.FirstJobEntity
        },
        Organization = new Organization
        {
            Id = 1,
            Name = "newOrganization"
        },
        OrganizationId = 1,
        IsOrganizationOwner = true,
        HasPostedFirstJob = true
    };

    public static Employer SecondEmployerEntity = new()
    {
        Id = 2,
        FullName = "test name",
        Email = "secondEmployer@gmail.com",
        UserId = 2,
        Jobs = new List<Job>
        {
            JobFixtures.FirstJobEntity
        },
        Organization = new Organization
        {
            Name = "newOrganization"
        },
        HasPostedFirstJob = true
    };
}