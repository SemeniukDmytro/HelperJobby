using ApplicationDomain.Models;

namespace ApplicationBLLUnitTests.Fixture;

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
            JobFixtures.JobEntity
        },
        Organization = new Organization()
        {
            Name = "newOrganization"
        }
        
    };
}