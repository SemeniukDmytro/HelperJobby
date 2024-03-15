using HelperJobby.DTOs.Account;

namespace HelperJobby.DTOs.Resume;

public class ResumeDTO
{
    public int Id { get; set; }

    public int JobSeekerId { get; set; }
    public DateOnly CreatedOn { get; set; }

    public JobSeekerDTO JobSeeker { get; set; }

    public List<EducationDTO> Educations { get; set; }
    public List<WorkExperienceDTO> WorkExperiences { get; set; }
    public List<SkillDTO> Skills { get; set; }
}