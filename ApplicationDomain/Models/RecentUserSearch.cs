using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApplicationDomain.Models;

public class RecentUserSearch
{
    public int Id { get; set; }
    [MaxLength(100)]
    public string Query { get; set; }
    [Required]
    [MaxLength(50)]
    public string Location { get; set; }
    [Required]
    [ForeignKey("User")]
    public int UserId { get; set; }
    public User User { get; set; }
}