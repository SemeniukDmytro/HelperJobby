using System.Linq.Expressions;
using ApplicationDomain.Models;

public static class JobProjections
{
    public static Expression<Func<Job, Job>> JobWithOrganizationName()
    {
        return j => new Job
        {
            Id = j.Id,
            JobTitle = j.JobTitle,
            NumberOfOpenings = j.NumberOfOpenings,
            Language = j.Language,
            Location = j.Location,
            JobTypes = j.JobTypes,
            Salary = j.Salary,
            Schedule = j.Schedule,
            Benefits = j.Benefits,
            ContactEmail = j.ContactEmail,
            ResumeRequired = j.ResumeRequired,
            Description = j.Description,
            DatePosted = j.DatePosted,
            EmployerId = j.EmployerId,
            Employer = new Employer
            {
                Organization = new Organization
                {
                    Id = j.Employer.OrganizationId,
                    Name = j.Employer.Organization.Name
                }
            }
        };
    }
}