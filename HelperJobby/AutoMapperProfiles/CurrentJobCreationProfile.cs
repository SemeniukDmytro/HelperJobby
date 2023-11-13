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
        CreateMap<CurrentJobCreationDTO, CurrentJobCreation>().AfterMap((src, dest, context) =>
        {
            dest.EmployerAccount = context.Mapper.Map<EmployerAccountDTO, EmployerAccount>(src.EmployerAccount);
            dest.Benefits = FlagsEnumToArrayConverter.GetSingleValue(src.Benefits);
            dest.Schedule = FlagsEnumToArrayConverter.GetSingleValue(src.Schedule);
            dest.JobTypes = FlagsEnumToArrayConverter.GetSingleValue(src.JobType);
        });
    }
}