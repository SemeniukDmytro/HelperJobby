using ApplicationDomain.Models;

namespace BLLUnitTests.Fixture;

public static class EmployerAccountFixtures
{
    public static EmployerAccount EmployerAccountEntity = new EmployerAccount()
    {
        Id = 1,
        FullName = "test name",
        Email = "test@gmail.com",
        UserId = 1,
        Jobs = new List<Job>()
        {
            JobFixtures.FirstJobEntity
        },
        Organization = new Organization()
        {
            Name = "newOrganization"
        }
    };
    
    public static EmployerAccount SecondEmployerAccountEntity = new EmployerAccount()
    {
        Id = 2,
        FullName = "test name",
        Email = "secondEmployer@gmail.com",
        UserId = 2,
        Jobs = new List<Job>()
        {
            JobFixtures.FirstJobEntity
        },
        Organization = new Organization()
        {
            Name = "newOrganization"
        }
    };
}