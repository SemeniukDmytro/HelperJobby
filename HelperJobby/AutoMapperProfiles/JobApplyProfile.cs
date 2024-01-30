using ApplicationDomain.Models;
using AutoMapper;
using HelperJobby.DTOs.Account;
using HelperJobby.DTOs.Job;
using HelperJobby.DTOs.UserJobInteractions;

namespace HelperJobby.AutoMapperProfiles;

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