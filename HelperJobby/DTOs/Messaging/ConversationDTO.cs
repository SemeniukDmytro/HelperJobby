namespace HelperJobby.DTOs.Message;

public class ConversationDTO
{
    public int Id { get; set; }
    public DateTime LastModified { get; set; }
    public List<MessageDTO> Messages { get; set; }
    public List<ChatMemebershipDTO> ConversationUsers { get; set; }
}