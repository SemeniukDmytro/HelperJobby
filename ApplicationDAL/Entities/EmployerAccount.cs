using System.ComponentModel.DataAnnotations.Schema;

namespace ApplicationDAL.Entities;

public class EmployerAccount
{
    public int Id { get; set; }
    
    [ForeignKey("User")]
    public int UserId { get; set; }
    
    public User User { get; set; }
    
    public Organization Organization { get; set; }
}