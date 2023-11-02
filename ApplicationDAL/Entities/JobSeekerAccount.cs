using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApplicationDAL.Entities;

public class JobSeekerAccount
{
    public int Id { get; set; }
    
    public string FirstName { get; set; }
    
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
}