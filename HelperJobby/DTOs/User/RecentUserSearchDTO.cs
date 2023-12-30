namespace HelperJobby.DTOs.User;

public class RecentUserSearchDTO
{
    public int Id { get; set; }
    public string Query { get; set; }
    public string Location { get; set; }
    public int UserId { get; set; }
    public UserDTO User { get; set; }
}