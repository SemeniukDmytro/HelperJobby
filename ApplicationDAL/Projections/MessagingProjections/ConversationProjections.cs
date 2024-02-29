using System.Linq.Expressions;
using ApplicationDomain.MessagingRelatedModels;
using ApplicationDomain.Models;

namespace ApplicationDAL.Projections.MessagingProjections;

public class ConversationProjections
{
    public static Expression<Func<Conversation, Conversation>> ShortConversationInfo()
    {
        return c => new Conversation()
        {
            Id = c.Id,
            LastModified = c.LastModified,
            Employer = new Employer()
            {
                Id = c.Employer.Id,
                FullName = c.Employer.FullName,
                Organization = new Organization()
                {
                    Id = c.Employer.Organization.Id,
                    Name = c.Employer.Organization.Name
                }
            },
            JobSeeker =
            {
                Id = c.JobSeeker.Id,
                FirstName = c.JobSeeker.FirstName,
                LastName = c.JobSeeker.LastName,
            },
            Job = new Job()
            {
                Id = c.Job.Id,
                JobTitle = c.Job.JobTitle
            }
        };
    }

    public static Expression<Func<Conversation, Conversation>> FullConversationInfo()
    {
        return c => new Conversation()
        {
            Id = c.Id,
            LastModified = c.LastModified,
            Messages = c.Messages,
            Employer = new Employer()
            {
                Id = c.Employer.Id,
                FullName = c.Employer.FullName,
                Organization = new Organization()
                {
                    Id = c.Employer.Organization.Id,
                    Name = c.Employer.Organization.Name
                }
            },
            JobSeeker = new JobSeeker()
            {
                Id = c.JobSeeker.Id,
                FirstName = c.JobSeeker.FirstName,
                LastName = c.JobSeeker.LastName,
            },
            Job = c.Job
        };
    }
}