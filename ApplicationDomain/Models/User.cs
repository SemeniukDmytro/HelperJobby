using System.ComponentModel.DataAnnotations;
using ApplicationDomain.AuthRelatedModels;
using ApplicationDomain.MessagingRelatedModels;

namespace ApplicationDomain.Models;

public class User
{
    public List<RecentUserSearch> RecentUserSearches;
    public int Id { get; set; }

    [Required] [MaxLength(50)] public string Email { get; set; }

    [Required] [MaxLength(200)] public string PasswordHash { get; set; }

    [Required] [MaxLength(10)] public string AccountType { get; set; }

    public JobSeeker JobSeeker { get; set; }

    public Employer? Employer { get; set; }

    public RefreshToken RefreshToken { get; set; }
    
    public List<ChatMembership> ChatMemberships { get; set; }
    
    public List<Message> Messages { get; set; }
}