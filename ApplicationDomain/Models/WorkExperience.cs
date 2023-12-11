using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApplicationDomain.Models;

public class WorkExperience
{
    public int WorkExperienceId { get; set; }

    [Required]
    [MaxLength(100)] 
    public string JobTitle { get; set; }

    [MaxLength(100)] 
    public string? Company { get; set; }

    [MaxLength(45)] 
    public string? Country { get; set; }

    [MaxLength(30)]
    public string? CityOrProvince { get; set; }
    public DateOnly? From { get; set; }
    public DateOnly? To { get; set; }

    public bool? CurrentlyWorkHere { get; set; }

    [MaxLength(2000)]
    public string? Description { get; set; }
    [Required]
    [ForeignKey("Resume")]
    public int ResumeId { get; set; }
    public Resume Resume { get; set; }
}