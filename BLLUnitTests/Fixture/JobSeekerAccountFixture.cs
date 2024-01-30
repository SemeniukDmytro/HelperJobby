using ApplicationDomain.Models;

namespace BLLUnitTests.Fixture;

public static class JobSeekerAccountFixture
{
    public static readonly JobSeekerAccount UpdatedJobSeekerAccount = new()
    {
        Id = 1,
        FirstName = "Firstname",
        LastName = "Lastname",
        PhoneNumber = "+123456789",
        Address = new Address
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
        Address = new Address
        {
            Id = 1,
            City = "TestCity",
            Country = "Canada",
            PostalCode = ""
        },
        Resume = ResumeFixtures.ResumeEntity,
        JobApplies = new List<JobApply>
        {
            new()
            {
                JobId = 2,
                JobSeekerAccountId = 1
            }
        },
        Interviews = new List<Interview>
        {
            new()
            {
                JobId = 1,
                JobSeekerAccountId = 1
            }
        }
    };

    public static readonly JobSeekerAccount SecondJobSeekerAccountEntity = new()
    {
        Id = 1,
        FirstName = "Firstname",
        LastName = "Lastname",
        PhoneNumber = "",
        SavedJobs = new List<SavedJob>
        {
            new()
            {
                JobId = 1,
                JobSeekerAccountId = 1
            }
        }
    };
}