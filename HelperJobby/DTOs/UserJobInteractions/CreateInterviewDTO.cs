using ApplicationDomain.Enums;

namespace HelperJobby.DTOs.UserJobInteractions;

public class CreateInterviewDTO
{
    public DateTime InterviewStart { get; set; }
    public TimeOnly InterviewEnd { get; set; }
    public InterviewTypes InterviewType { get; set; }
    public string AppointmentInfo { get; set; }
}