using System.ComponentModel.DataAnnotations;
using ApplicationDomain.AuthRelatedModels;

namespace ApplicationDomain.Models;

public class User
{
    public List<RecentUserSearch> RecentUserSearches;
    public int Id { get; set; }

    [Required] [MaxLength(50)] public string Email { get; set; }

    [Required] [MaxLength(200)] public string PasswordHash { get; set; }

    [Required] [MaxLength(10)] public string AccountType { get; set; }

    public JobSeekerAccount JobSeekerAccount { get; set; }

    public EmployerAccount EmployerAccount { get; set; }

    public RefreshToken RefreshToken { get; set; }
}