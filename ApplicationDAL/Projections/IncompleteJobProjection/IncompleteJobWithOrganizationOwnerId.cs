using System.Linq.Expressions;
using ApplicationDomain.Models;

namespace ApplicationDAL.Projections.IncompleteJobProjection;

public class IncompleteJobWithOrganizationOwnerId
{
    public static Expression<Func<IncompleteJob, IncompleteJob>> JobWithOrganizationName()
    {
        return j => new IncompleteJob()
        {
            Id = j.Id,
            JobTitle = j.JobTitle,
            NumberOfOpenings = j.NumberOfOpenings,
            Language = j.Language,
            Location = j.Location,
            JobLocationType = j.JobLocationType,
            LocationCountry = j.LocationCountry,
            JobTypes = j.JobTypes,
            Salary = j.Salary,
            Schedule = j.Schedule,
            Benefits = j.Benefits,
            ContactEmail = j.ContactEmail,
            ContactPhoneNumber = j.ContactPhoneNumber,
            ResumeRequired = j.ResumeRequired,
            Description = j.Description,
            EmployerId = j.EmployerId,
            Employer = new Employer
            {
                Id = j.Employer.Id,
                Organization = new Organization
                {
                    Id = j.Employer.OrganizationId
                }
            }
        };
    }
}