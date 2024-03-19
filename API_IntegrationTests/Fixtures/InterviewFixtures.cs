using ApplicationDomain.Enums;
using HelperJobby.DTOs.UserJobInteractions;

namespace API_IntegrationTests.Fixtures;

public static class InterviewFixtures
{
    public static CreateInterviewDTO createInterviewDTO = new()
    {
        AppointmentInfo = "VideoCall.com",
        InterviewStart = DateTime.UtcNow,
        InterviewEnd = TimeOnly.FromDateTime(DateTime.UtcNow)
            .Add(TimeOnly.FromTimeSpan(TimeSpan.FromHours(1)).ToTimeSpan()),
        InterviewType = InterviewTypes.Video
    };
}