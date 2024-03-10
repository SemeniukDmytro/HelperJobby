using ApplicationBLL.Logic;
using ApplicationDomain.Enums;
using ApplicationDomain.Models;
using AutoMapper;
using HelperJobby.DTOs.Account;
using HelperJobby.DTOs.Job;

namespace HelperJobby.AutoMapperProfiles;

public class JobProfile : Profile
{
    public JobProfile()
    {
        CreateMap<Job, JobDTO>().AfterMap((src, dest, context) =>
        {
            dest.Employer = context.Mapper.Map<Employer, EmployerDTO>(src.Employer);
            dest.Benefits = FlagsEnumToArrayConverter.GetArrayWithEnumValues<EmployeeBenefits>((int)src.Benefits);
            dest.Schedule = FlagsEnumToArrayConverter.GetArrayWithEnumValues<Schedules>((int)src.Schedule);
            dest.JobType = FlagsEnumToArrayConverter.GetArrayWithEnumValues<JobTypes>((int)src.JobTypes);
        });
        
        CreateMap<JobDTO, Job>()
            .ForMember(dest => dest.Benefits,
                opt => opt.MapFrom(src => FlagsEnumToArrayConverter.GetSingleValue(src.Benefits)))
            .ForMember(dest => dest.Schedule,
                opt => opt.MapFrom(src => FlagsEnumToArrayConverter.GetSingleValue(src.Schedule)))
            .ForMember(dest => dest.JobTypes,
                opt => opt.MapFrom(src => FlagsEnumToArrayConverter.GetSingleValue(src.JobType)));

        CreateMap<IncompleteJobDTO, Job>()
            .ForMember(dest => dest.Benefits,
                opt => opt.MapFrom(src => FlagsEnumToArrayConverter.GetSingleValue(src.Benefits)))
            .ForMember(dest => dest.Schedule,
                opt => opt.MapFrom(src => FlagsEnumToArrayConverter.GetSingleValue(src.Schedule)))
            .ForMember(dest => dest.JobTypes,
                opt => opt.MapFrom(src => FlagsEnumToArrayConverter.GetSingleValue(src.JobType)));
        CreateMap<UpdatedJobDTO, Job>()
            .ForMember(dest => dest.Benefits,
                opt => opt.MapFrom(src => FlagsEnumToArrayConverter.GetSingleValue(src.Benefits)))
            .ForMember(dest => dest.Schedule,
                opt => opt.MapFrom(src => FlagsEnumToArrayConverter.GetSingleValue(src.Schedule)))
            .ForMember(dest => dest.JobTypes,
                opt => opt.MapFrom(src => FlagsEnumToArrayConverter.GetSingleValue(src.JobType)));
        CreateMap<Job, IncompleteJob>().ReverseMap();
    }
}