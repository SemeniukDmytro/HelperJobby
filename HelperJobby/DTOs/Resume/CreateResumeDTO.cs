namespace HelperJobby.DTOs.Resume;

public class CreateResumeDTO
{
    public List<CreateUpdateEducationDTO> Educations { get; set; }
    public List<CreateUpdateWorkExperienceDTO> WorkExperiences { get; set; }
    public List<CreateSkillDTO> Skills { get; set; }
}