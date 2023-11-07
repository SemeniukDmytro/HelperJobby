using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApplicationDomain.Models;

public class WorkExperience
{
    public int WorkExperienceId { get; set; }

    [Required]
    [MaxLength(100)] 
    public string JobTitle { get; set; }

    [Required]
    [MaxLength(100)] 
    public string Company { get; set; }

    [Required]
    [MaxLength(45)] 
    public string Country { get; set; }

    [Required]
    [MaxLength(30)]
    public string CityOrProvince { get; set; }

    [Required]
    public DateTime From { get; set; }

    public DateTime? To { get; set; }

    public bool CurrentlyWorkHere { get; set; }

    [MaxLength(2000)]
    public string Description { get; set; }
    
    [ForeignKey("Resume")]
    public int ResumeId { get; set; }
    
    [Required]
    public Resume Resume { get; set; }
}