using ApplicationDomain.MessagingRelatedModels;
using HelperJobby.DTOs.User;

namespace HelperJobby.DTOs.Message;

public class ChatMemebershipDTO
{
    public class ChatMembership
    {
        public int UserId { get; set; }
        public UserDTO User { get; set; }
        public int ConversationId { get; set; }
        public Conversation Conversation { get; set; }
    }

}