namespace HelperJobby.DTOs.Resume;

public class CreateEducationDTO
{
    public string LevelOfEducation { get; set; }
    public string FieldOfStudy { get; set; }
    public string SchoolName { get; set; }
    public string Country { get; set; }
    public string City { get; set; }
    public DateOnly From { get; set; }
    public DateOnly To { get; set; }
}