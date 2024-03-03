using System.Linq.Expressions;
using ApplicationDomain.MessagingRelatedModels;
using ApplicationDomain.Models;

namespace ApplicationDAL.Projections.MessagingProjections;

public class ConversationProjections
{
    public static Expression<Func<Conversation, ConversationWithLastMessage>> ShortConversationInfo()
    {
        return c => new ConversationWithLastMessage()
        {
            Id = c.Id,
            LastModified = c.LastModified,
            EmployerId = c.EmployerId,
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
            JobSeekerId = c.JobSeekerId,
            JobSeeker = new JobSeeker()
            {
                Id = c.JobSeeker.Id,
                FirstName = c.JobSeeker.FirstName,
                LastName = c.JobSeeker.LastName,
            },
            JobId = c.JobId,
            Job = new Job()
            {
                Id = c.Job.Id,
                JobTitle = c.Job.JobTitle
            },
            LastConversationMessage = c.Messages.OrderByDescending(m=> m.SentAt).FirstOrDefault()
        };
    }

    public static Expression<Func<Conversation, Conversation>> FullConversationInfo()
    {
        return c => new Conversation()
        {
            Id = c.Id,
            LastModified = c.LastModified,
            Messages = c.Messages,
            EmployerId = c.EmployerId,
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
            JobSeekerId = c.JobSeekerId,
            JobSeeker = new JobSeeker()
            {
                Id = c.JobSeeker.Id,
                FirstName = c.JobSeeker.FirstName,
                LastName = c.JobSeeker.LastName,
            },
            JobId = c.JobId,
            Job = c.Job
        };
    }
}