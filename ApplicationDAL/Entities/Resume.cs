using System.ComponentModel.DataAnnotations;

namespace ApplicationDAL.Entities;

public class Resume
{
    public int Id { get; set; }
    
    public int JobSeekerAccountId { get; set; }
    
    [Required]
    public JobSeekerAccount JobSeekerAccount { get; set; }
    
    public List<Education> Educations { get; set; }
    
    public List<WorkExperience> WorkExperiences { get; set; }

    public List<PersonSkill> PersonSkills { get; set; }
}