using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ApplicationDAL.Enums;

namespace ApplicationDAL.Entities;

public class Job
{
    public int Id { get; set; }
    
    [Required]
    [MaxLength(50)]
    public string JobTitle { get; set; }
    
    [Required]
    [MaxLength(45)]
    public string CompanyName { get; set; }
    
    [Required]
    public int NumberOfOpenings { get; set; }
    
    [Required]
    [MaxLength(20)]
    public string Language { get; set; }
    
    [Required]
    [MaxLength(50)]
    public string Location { get; set; }
    
    [Required]
    public JobTypes JobTypes { get; set; }
    
    [Column(TypeName = "decimal(10,2)")]
    public decimal Salary { get; set; }
    public Schedules Schedule { get; set; }
    
    public EmployeeBenefits Benefits { get; set; }
    
    [Required]
    [MaxLength(50)]
    public string ContactEmail { get; set; }
    
    [DefaultValue(false)]
    public bool ResumeRequired { get; set; }
    
    [Column(TypeName = "text")]
    public string Description { get; set; }
    
    [ForeignKey("EmployerAccount")]
    public int EmployerAccountId { get; set; }
    
    [Required]
    public EmployerAccount EmployerAccount { get; set; }
}