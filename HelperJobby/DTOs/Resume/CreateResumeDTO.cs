namespace HelperJobby.DTOs.Resume;

public class CreateResumeDTO
{
    public List<CreateUpdateEducationDTO> Educations { get; set; }
    public List<CreateWorkExperienceDTO> WorkExperiences { get; set; }
    public List<CreateSkillDTO> Skills { get; set; }
}