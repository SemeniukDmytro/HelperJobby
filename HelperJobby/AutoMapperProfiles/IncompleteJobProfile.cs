using ApplicationBLL.Logic;
using ApplicationDomain.Enums;
using ApplicationDomain.Models;
using AutoMapper;
using HelperJobby.AutoMapperProfiles.CustomConverters;
using HelperJobby.DTOs.Account;
using HelperJobby.DTOs.Job;

namespace HelperJobby.AutoMapperProfiles;

public class IncompleteJobProfile : Profile
{
    public IncompleteJobProfile()
    {
        CreateMap<IncompleteJob, IncompleteJobDTO>().AfterMap((src, dest, context) =>
        {
            dest.Employer = context.Mapper.Map<Employer, EmployerDTO>(src.Employer);
            dest.Benefits = src.Benefits == null
                ? null
                : FlagsEnumToArrayConverter.GetArrayWithEnumValues<EmployeeBenefits>((int)src.Benefits);
            dest.Schedule = src.Schedule == null
                ? null
                : FlagsEnumToArrayConverter.GetArrayWithEnumValues<Schedules>((int)src.Schedule);
            dest.JobType = src.JobTypes == null
                ? null
                : FlagsEnumToArrayConverter.GetArrayWithEnumValues<JobTypes>((int)src.JobTypes);
        });
        CreateMap<UpdatedIncompleteJobDTO, IncompleteJob>()
            .ForMember(dest => dest.Schedule, opt => opt.MapFrom<GenericScheduleListToEnumResolver>())
            .ForMember(dest => dest.Benefits, opt => opt.MapFrom<GenericBenefitsListToEnumResolver>())
            .AfterMap((src, dest, context) =>
            {
                dest.JobTypes = src.JobType == null ? null : FlagsEnumToArrayConverter.GetSingleValue(src.JobType);
                dest.JobLocationType = src.JobLocationType ?? JobLocationTypes.NotSpecified;
            });

        CreateMap<CreateIncompleteJobDTO, IncompleteJob>()
            .ForMember(dest => dest.Schedule, opt => opt.MapFrom<GenericScheduleListToEnumResolver>())
            .ForMember(dest => dest.Benefits, opt => opt.MapFrom<GenericBenefitsListToEnumResolver>())
            .AfterMap((src, dest) =>
            {
                dest.JobTypes = src.JobType == null ? null : FlagsEnumToArrayConverter.GetSingleValue(src.JobType);
            });
    }
}