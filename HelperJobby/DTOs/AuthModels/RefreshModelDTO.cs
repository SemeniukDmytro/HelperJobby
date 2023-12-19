using ApplicationDomain.AuthRelatedModels;

namespace HelperJobby.DTOs.AuthModels;

public class RefreshModelDTO
{
    public string AccessToken { get; set; }
    public string RefreshToken { get; set; }
}