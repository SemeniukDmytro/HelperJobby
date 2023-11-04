using ApplicationCommon.DTOs.Account;
using ApplicationCommon.DTOs.Job;
using ApplicationCommon.DTOs.UserJobInteractions;
using ApplicationDAL.Entities;
using AutoMapper;

namespace ApplicationBLL.AutoMapperProfiles;

public class JobProfile : Profile
{
    public JobProfile()
    {
        CreateMap<Job, JobDTO>().AfterMap((src, dest, context) =>
        {
            dest.EmployerAccount = context.Mapper.Map<EmployerAccount, EmployerAccountDTO>(src.EmployerAccount);
        });
        CreateMap<JobDTO, Job>().AfterMap((src, dest, context) =>
        {
            dest.EmployerAccount = context.Mapper.Map<EmployerAccountDTO, EmployerAccount>(src.EmployerAccount);
        });
    }
}