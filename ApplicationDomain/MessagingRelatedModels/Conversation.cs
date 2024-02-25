namespace ApplicationDomain.MessagingRelatedModels;

public class Conversation
{
    public int Id { get; set; }
    public DateTime LastModified { get; set; }
    public List<Message> Messages { get; set; }
    public List<ChatMembership> ConversationUsers { get; set; }
}