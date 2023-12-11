using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ApplicationDomain.Attributes;
using ApplicationDomain.Enums;

namespace ApplicationDomain.Models;

public class CurrentJobCreation
{
    [ExcludeFromUpdate]
    public int Id { get; set; }
    
    [Required]
    [MaxLength(50)]
    public string JobTitle { get; set; }
    
    [Required]
    public int NumberOfOpenings { get; set; }
    
    [Required]
    [MaxLength(20)]
    public string Language { get; set; }
    
    [MaxLength(50)]
    public string Location { get; set; }
    
    public JobTypes JobTypes { get; set; }
    
    [Column(TypeName = "decimal(10,2)")]
    public decimal Salary { get; set; }
    
    public Schedules Schedule { get; set; }
    
    public EmployeeBenefits Benefits { get; set; }
    
    [MaxLength(50)]
    public string ContactEmail { get; set; }
    
    [DefaultValue(false)]
    public bool ResumeRequired { get; set; }
    
    [Column(TypeName = "text")]
    public string Description { get; set; }
    
    [Required]
    [ExcludeFromUpdate]
    [ForeignKey("EmployerAccount")]
    public int EmployerAccountId { get; set; }
    [ExcludeFromUpdate]
    public EmployerAccount EmployerAccount { get; set; }
}