using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApplicationDomain.Models;

public class EmployerAccount
{
    public int Id { get; set; }
    
    [Required]
    [MaxLength(60)]
    public string FullName { get; set; }
    
    [Required]
    [MaxLength(50)]
    public string ContactEmail { get; set; }
    
    [MaxLength(15)]
    public string ContactNumber { get; set; }
    
    [ForeignKey("User")]
    public int UserId { get; set; }
    
    [Required]
    public User User { get; set; }
    public Organization Organization { get; set; }
    
    public List<Job> Jobs { get; set; }
}