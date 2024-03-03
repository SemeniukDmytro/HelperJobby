using ApplicationDomain.MessagingRelatedModels;
using ApplicationDomain.Models;

namespace ApplicationDAL.Projections.MessagingProjections;

public class ConversationWithLastMessage
{
        public int Id { get; set; }
        public DateTime LastModified { get; set; }
        public Message? LastConversationMessage { get; set; }
        public int JobSeekerId { get; set; }
        public JobSeeker JobSeeker { get; set; }
        public int EmployerId { get; set; }
        public Employer Employer { get; set; }
        public int JobId { get; set; }
        public Job Job { get; set; }
}