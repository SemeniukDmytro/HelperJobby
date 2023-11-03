using ApplicationCommon.DTOs.Account;

namespace ApplicationCommon.DTOs.Resume;

public class ResumeDTO
{
    public int Id { get; set; }
    
    public int JobSeekerAccountId { get; set; }
    
    public JobSeekerAccountDTO JobSeekerAccountDTO { get; set; }
    
    public List<EducationDTO> Educations { get; set; }
    public List<WorkExperienceDTO> WorkExperiences { get; set; }
    public List<SkillDTO> Skills { get; set; }
}