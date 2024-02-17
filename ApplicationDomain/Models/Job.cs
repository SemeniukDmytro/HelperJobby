using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ApplicationDomain.Attributes;
using ApplicationDomain.Enums;

namespace ApplicationDomain.Models;

public class Job
{
    [ExcludeFromUpdate] public int Id { get; set; }

    [Required] [MaxLength(50)] public string JobTitle { get; set; }

    [Required] public int NumberOfOpenings { get; set; }

    [Required] [MaxLength(20)] public string Language { get; set; }
    [Required] [MaxLength(50)] public string LocationCountry { get; set; }
    [Required] public JobLocationTypes JobLocationType { get; set; }
    [Required] [MaxLength(50)] public string Location { get; set; }

    [Required] public JobTypes JobTypes { get; set; }
    [Required] public Schedules Schedule { get; set; }

    public EmployeeBenefits Benefits { get; set; }

    [Required] [MaxLength(50)] public string ContactEmail { get; set; }

    [AllowEmptyString] [MaxLength(15)] public string? ContactPhoneNumber { get; set; }

    [DefaultValue(0)] public ResumeRequirementOptions ResumeRequired { get; set; }

    [Required] [Column(TypeName = "text")] public string Description { get; set; }

    [ExcludeFromUpdate] [Required] public DateOnly DatePosted { get; set; }
    [ExcludeFromUpdate] public JobSalary? Salary { get; set; }

    [ExcludeFromUpdate]
    [Required]
    [ForeignKey("Employer")]
    public int EmployerId { get; set; }

    [ExcludeFromUpdate] public Employer Employer { get; set; }

    public List<Interview> Interviews { get; set; }

    public List<JobApply> JobApplies { get; set; }
}