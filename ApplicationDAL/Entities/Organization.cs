using System.ComponentModel.DataAnnotations;

namespace ApplicationDAL.Entities;

public class Organization
{
    public int Id { get; set; }
    
    [Required]
    [MaxLength(100)]
    public string Name { get; set; }
    
    [MaxLength(15)]
    public string PhoneNumber { get; set; }
    
    public int EmployerAccountId { get; set; }
    
    public EmployerAccount EmployerAccount { get; set; }
}