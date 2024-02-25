using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ApplicationDomain.Models;

namespace ApplicationDomain.MessagingRelatedModels;

public class ChatMembership
{
    [Key]
    [Column(Order = 0)]
    [ForeignKey("User")]
    public int UserId { get; set; }
    public User User { get; set; }

    [Key]
    [Column(Order = 1)]
    [ForeignKey("Conversation")]
    public int ConversationId { get; set; }
    public Conversation Conversation { get; set; }
}
