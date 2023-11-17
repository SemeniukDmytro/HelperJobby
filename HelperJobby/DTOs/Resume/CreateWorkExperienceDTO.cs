namespace HelperJobby.DTOs.Resume;

public class CreateWorkExperienceDTO
{
    public string JobTitle { get; set; }
    public string Company { get; set; }
    public string Country { get; set; }
    public string CityOrProvince { get; set; }
    public DateTime From { get; set; }
    public DateTime? To { get; set; }
    public bool CurrentlyWorkHere { get; set; }
    public string Description { get; set; }
}