using HelperJobby.DTOs.Job;

namespace HelperJobby.DTOs.SearchDTOs;

public class JobSearchResultDTO
{
    public IEnumerable<JobDTO> jobs { get; set; }
    public bool HasMore { get; set; }
}