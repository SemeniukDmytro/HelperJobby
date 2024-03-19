using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ApplicationDomain.MessagingRelatedModels;

namespace ApplicationDomain.Models;

public class JobSeeker
{
    public int Id { get; set; }

    [DefaultValue("")] [MaxLength(30)] public string FirstName { get; set; }

    [DefaultValue("")] [MaxLength(30)] public string LastName { get; set; }

    [DefaultValue("")] [MaxLength(15)] public string PhoneNumber { get; set; }

    [Required] [ForeignKey("User")] public int UserId { get; set; }

    public User User { get; set; }

    [ForeignKey("Address")] public int? AddressId { get; set; }

    public Address? Address { get; set; }

    public Resume? Resume { get; set; }

    public List<Interview> Interviews { get; set; }

    public List<JobApply> JobApplies { get; set; }

    public List<SavedJob> SavedJobs { get; set; }
    public List<Conversation> Conversations { get; set; }
}