using ApplicationDomain.Models;

namespace ApplicationBLLUnitTests.Fixture;

public static class JobSeekerAccountFixture
{
    public static readonly JobSeekerAccount UpdatedJobSeekerAccount = new()
    {
        Id = 1,
        FirstName = "Firstname",
        LastName = "Lastname",
        PhoneNumber = "+123456789",
        Address = new Address()
        {
            Id = 1,
            City = "Test",
            Country = "Canada",
            PostalCode = "101101"
        }
    };
    
    public static readonly JobSeekerAccount JobSeekerAccountEntity = new()
    {
        Id = 1,
        FirstName = "Firstname",
        LastName = "Lastname",
        PhoneNumber = "",
        UserId = 1,
        Address = new Address()
        {
            Id = 1,
            City = "TestCity",
            Country = "Canada",
            PostalCode = ""
        }
    };
    
    public static readonly JobSeekerAccount JobSeekerAccountEntityWithSavedJobs = new()
    {
        Id = 1,
        FirstName = "Firstname",
        LastName = "Lastname",
        PhoneNumber = "",
        SavedJobs = new List<SavedJob>()
        {
            new()
            {
                JobId = 1,
                JobSeekerAccountId = 1
            }
        }
    };
}