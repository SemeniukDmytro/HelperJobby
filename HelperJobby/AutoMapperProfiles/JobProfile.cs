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
            dest.EmployerAccount = context.Mapper.Map<EmployerAccount, EmployerAccountDTO>(src.EmployerAccount);
            dest.Benefits = FlagsEnumToArrayConverter.GetArrayWithStringValues<EmployeeBenefits>((int)src.Benefits);
            dest.Schedule = FlagsEnumToArrayConverter.GetArrayWithStringValues<Schedules>((int)src.Schedule);
            dest.JobType = FlagsEnumToArrayConverter.GetArrayWithStringValues<JobTypes>((int)src.JobTypes);
        });

        CreateMap<CurrentJobCreationDTO, Job>()
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
        CreateMap<Job, CurrentJobCreation>().ReverseMap();
    }
}