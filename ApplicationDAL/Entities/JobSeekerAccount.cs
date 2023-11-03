using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApplicationDAL.Entities;

public class JobSeekerAccount
{
    public int Id { get; set; }
    
    [MaxLength(30)]
    public string FirstName { get; set; }
    
    [MaxLength(30)]
    public string LastName { get; set; }
    
    [MaxLength(15)]
    public string PhoneNumber { get; set; }
    
    [ForeignKey("User")]
    public int UserId { get; set; }
    
    [Required]
    public User User { get; set; }
    
    [ForeignKey("Address")]
    public int AddressId { get; set; }
    
    public Address Address { get; set; }
    
    public Resume Resume { get; set; }
    
    public List<Interview> Interviews { get; set; }
    
    public List<JobApply> JobApplies { get; set; }
    
    public List<SavedJob> SavedJobs { get; set; }
}