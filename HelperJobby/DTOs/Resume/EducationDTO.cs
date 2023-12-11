namespace HelperJobby.DTOs.Resume;

public class EducationDTO
{
    public int Id { get; set; }
    public string LevelOfEducation { get; set; }
    public string? FieldOfStudy { get; set; }
    public string? SchoolName { get; set; }
    public string? Country { get; set; }
    public string? City { get; set; }
    public DateOnly? From { get; set; }
    public DateOnly? To { get; set; }
    public int ResumeId { get; set; }
    public ResumeDTO Resume { get; set; }
}