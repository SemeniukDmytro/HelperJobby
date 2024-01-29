using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ApplicationDomain.Models;

namespace ApplicationDomain.AuthRelatedModels;

public class RefreshToken
{
    public int Id { get; set; }
    
    [Required]
    [MaxLength(256)]
    public string Token { get; set; }
    [Required]
    public DateTime CreatedAt { get; set; }
    [Required]
    public DateTime Expires { get; set; }
    [Required]
    [ForeignKey("User")]
    public int UserId { get; set; }
    public User User { get; set; }
}