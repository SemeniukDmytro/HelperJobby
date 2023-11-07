namespace HelperJobby.DTOs.Resume;

public class SkillDTO
{
    public int Id { get; set; }
    public int ResumeId { get; set; }
    public ResumeDTO Resume { get; set; }
    public string Name { get; set; }
}