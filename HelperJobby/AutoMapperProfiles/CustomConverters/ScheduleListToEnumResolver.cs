using ApplicationDomain.Enums;
using ApplicationDomain.Models;
using AutoMapper;

namespace HelperJobby.AutoMapperProfiles.CustomConverters;

public class GenericScheduleListToEnumResolver : IValueResolver<object, IncompleteJob, Schedules?>
{
    public Schedules? Resolve(object source, IncompleteJob destination, Schedules? destMember,
        ResolutionContext context)
    {
        var scheduleProperty = source.GetType().GetProperty("Schedule");
        if (scheduleProperty == null)
            throw new InvalidOperationException("Source type must have a 'Schedule' property.");

        var scheduleValue = scheduleProperty.GetValue(source) as IEnumerable<Schedules>;

        if (scheduleValue == null) return null;

        if (!scheduleValue.Any()) return 0;

        return scheduleValue.Aggregate((current, next) => current | next);
    }
}