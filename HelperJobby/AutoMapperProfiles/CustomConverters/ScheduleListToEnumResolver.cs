using ApplicationDomain.Enums;
using ApplicationDomain.Models;
using AutoMapper;
using HelperJobby.DTOs.Job;

namespace HelperJobby.AutoMapperProfiles.CustomConverters;

public class GenericScheduleListToEnumResolver : IValueResolver<object, IncompleteJob, Schedules?>
{
    public Schedules? Resolve(object source, IncompleteJob destination, Schedules? destMember, ResolutionContext context)
    {
        var scheduleProperty = source.GetType().GetProperty("Schedule");
        if (scheduleProperty == null)
        {
            throw new InvalidOperationException("Source type must have a 'Schedule' property.");
        }

        var scheduleValue = scheduleProperty.GetValue(source) as IEnumerable<Schedules>;

        if (scheduleValue == null || !scheduleValue.Any())
        {
            return (Schedules)0;
        }

        return scheduleValue.Aggregate((current, next) => current | next);
    }
}
