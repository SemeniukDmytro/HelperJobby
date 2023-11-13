using ApplicationBLL.Logic;
using ApplicationDomain.Enums;
using ApplicationDomain.Models;
using AutoMapper;
using HelperJobby.DTOs.Account;
using HelperJobby.DTOs.Job;

namespace HelperJobby.AutoMapperProfiles;

public class CurrentJobCreationProfile : Profile
{
    public CurrentJobCreationProfile()
    {
        CreateMap<CurrentJobCreation, CurrentJobCreationDTO>().AfterMap((src, dest, context) =>
        {
            dest.EmployerAccount = context.Mapper.Map<EmployerAccount, EmployerAccountDTO>(src.EmployerAccount);
            dest.Benefits = FlagsEnumToArrayConverter.GetArrayWithEnumValues<EmployeeBenefits>((int)src.Benefits);
            dest.Schedule = FlagsEnumToArrayConverter.GetArrayWithEnumValues<Schedules>((int)src.Schedule);
            dest.JobType = FlagsEnumToArrayConverter.GetArrayWithEnumValues<JobTypes>((int)src.JobTypes);
        });
        CreateMap<CurrentJobCreateDTO, CurrentJobCreation>().ForMember(dest => dest.Benefits, opt => opt.MapFrom(src => FlagsEnumToArrayConverter.GetSingleValue(src.Benefits)))
            .ForMember(dest => dest.Schedule, opt => opt.MapFrom(src => FlagsEnumToArrayConverter.GetSingleValue(src.Schedule)))
            .ForMember(dest => dest.JobTypes, opt => opt.MapFrom(src => FlagsEnumToArrayConverter.GetSingleValue(src.JobType)));
    }
}