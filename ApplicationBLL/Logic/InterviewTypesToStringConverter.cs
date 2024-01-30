using ApplicationDomain.Enums;
using ApplicationDomain.Exceptions;

namespace ApplicationBLL.Logic;

public static class InterviewTypesToStringConverter
{
    public static string InterviewTypeToStringConverter(InterviewTypes interviewType)
    {
        switch (interviewType)
        {
            case InterviewTypes.Phone:
                return "Phone";
            case InterviewTypes.Video:
                return "Video";
            case InterviewTypes.InPerson:
                return "In-person";
            default:
                throw new InterviewOperatingException("Invalid interview type");
        }
    }
}