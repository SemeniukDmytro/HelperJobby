using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ApplicationDomain.MessagingRelatedModels;

namespace ApplicationDomain.Models;

public class Employer
{
    public int Id { get; set; }

    [Required] [MaxLength(60)] public string FullName { get; set; }

    [Required] [MaxLength(50)] public string Email { get; set; }

    [MaxLength(15)] public string ContactNumber { get; set; }

    [DefaultValue(false)] public bool HasPostedFirstJob { get; set; }

    [Required] [DefaultValue(false)] public bool IsOrganizationOwner { get; set; }

    [ForeignKey("User")] public int UserId { get; set; }

    [Required] public User User { get; set; }

    [Required]
    [ForeignKey("Organization")]
    public int OrganizationId { get; set; }

    public Organization Organization { get; set; }

    public List<Job> Jobs { get; set; }

    public List<IncompleteJob> IncompleteJobs { get; set; }

    public List<Conversation> Conversations { get; set; }
}