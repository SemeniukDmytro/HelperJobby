namespace ApplicationCommon.DTOs.Resume;

public class WorkExperienceDTO
{
    public int WorkExperienceId { get; set; }
    public string JobTitle { get; set; }
    public string Company { get; set; }
    public string Country { get; set; }
    public string CityOrProvince { get; set; }
    public DateTime From { get; set; }
    public DateTime? To { get; set; }
    public bool CurrentlyWorkHere { get; set; }
    public string Description { get; set; }
    public int ResumeId { get; set; }
    public ResumeDTO Resume { get; set; }
}