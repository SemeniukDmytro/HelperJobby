using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApplicationDAL.Entities;

public class Resume
{
    public int Id { get; set; }
    
    [ForeignKey("JobSeekerAccount")]
    public int JobSeekerAccountId { get; set; }
    
    [Required]
    public JobSeekerAccount JobSeekerAccount { get; set; }
    
    public List<Education> Educations { get; set; }
    
    public List<WorkExperience> WorkExperiences { get; set; }

    public List<Skill> Skills { get; set; }
}