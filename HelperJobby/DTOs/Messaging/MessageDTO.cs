using HelperJobby.DTOs.User;

namespace HelperJobby.DTOs.Message;

public class MessageDTO
{
    public int Id { get; set; }
    public string Content { get; set; }
    public DateTime SentAt { get; set; }
    public bool IsRead { get; set; }
    public int SenderId { get; set; }
    public UserDTO Sender { get; set; }
    public int ConversationId { get; set; }
    public ConversationDTO Conversation { get; set; }
}