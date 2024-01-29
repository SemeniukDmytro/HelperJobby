using HelperJobby.DTOs.Resume;

namespace HelperJobby.DTOs.SearchDTOs;

public class ResumeSearchResultDTO
{
    public IEnumerable<ResumeDTO> Resumes { get; set; }
    public bool HasMore { get; set; }
}