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
            dest.JobSeeker = context.Mapper.Map<JobSeeker, JobSeekerDTO>(src.JobSeeker);
            dest.Job = context.Mapper.Map<Job, JobDTO>(src.Job);
        });

        CreateMap<JobApplyDTO, JobApply>().AfterMap((src, dest, context) =>
        {
            dest.JobSeeker = context.Mapper.Map<JobSeekerDTO, JobSeeker>(src.JobSeeker);
            dest.Job = context.Mapper.Map<JobDTO, Job>(src.Job);
        });

        CreateMap<UpdateJobApplyDTO, JobApply>();
    }
}