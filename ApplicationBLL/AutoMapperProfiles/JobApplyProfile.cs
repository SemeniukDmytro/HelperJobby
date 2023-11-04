using ApplicationCommon.DTOs.Account;
using ApplicationCommon.DTOs.Job;
using ApplicationCommon.DTOs.UserJobInteractions;
using ApplicationDAL.Entities;
using AutoMapper;

namespace ApplicationBLL.AutoMapperProfiles;

public class JobApplyProfile : Profile
{
    public JobApplyProfile()
    {
        CreateMap<JobApply, JobApplyDTO>().AfterMap((src, dest, context) =>
        {
            dest.JobSeekerAccount = context.Mapper.Map<JobSeekerAccount, JobSeekerAccountDTO>(src.JobSeekerAccount);
            dest.Job = context.Mapper.Map<Job, JobDTO>(src.Job);
        });
        
        CreateMap<JobApplyDTO, JobApply>().AfterMap((src, dest, context) =>
        {
            dest.JobSeekerAccount = context.Mapper.Map<JobSeekerAccountDTO, JobSeekerAccount>(src.JobSeekerAccount);
            dest.Job = context.Mapper.Map<JobDTO, Job>(src.Job);
        });
    }
}