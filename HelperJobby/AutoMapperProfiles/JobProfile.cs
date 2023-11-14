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
            dest.Benefits = FlagsEnumToArrayConverter.GetArrayWithEnumValues<EmployeeBenefits>((int)src.Benefits);
            dest.Schedule = FlagsEnumToArrayConverter.GetArrayWithEnumValues<Schedules>((int)src.Schedule);
            dest.JobType = FlagsEnumToArrayConverter.GetArrayWithEnumValues<JobTypes>((int)src.JobTypes);
        });
        CreateMap<JobDTO, Job>().AfterMap((src, dest, context) =>
        {
            dest.EmployerAccount = context.Mapper.Map<EmployerAccountDTO, EmployerAccount>(src.EmployerAccount);
            dest.Benefits = FlagsEnumToArrayConverter.GetSingleValue(src.Benefits);
            dest.Schedule = FlagsEnumToArrayConverter.GetSingleValue(src.Schedule);
            dest.JobTypes = FlagsEnumToArrayConverter.GetSingleValue(src.JobType);
        });
        CreateMap<CurrentJobCreationDTO, JobDTO>().AfterMap((src, dest, context) =>
        {
            dest.Id = 0;
        } );
        CreateMap<UpdatedJobDTO, JobDTO>();
    }
}