namespace HelperJobby.DTOs.Resume;

public class CreateWorkExperienceDTO
{
    public string? JobTitle { get; set; }
    public string? Company { get; set; }
    public string? Country { get; set; }
    public string? CityOrProvince { get; set; }
    public DateOnly? From { get; set; }
    public DateOnly? To { get; set; }
    public bool CurrentlyWorkHere { get; set; }
    public string Description { get; set; }
}