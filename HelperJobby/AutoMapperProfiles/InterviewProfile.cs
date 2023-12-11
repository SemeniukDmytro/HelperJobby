using ApplicationDomain.Models;
using AutoMapper;
using HelperJobby.DTOs.Account;
using HelperJobby.DTOs.Job;
using HelperJobby.DTOs.UserJobInteractions;

namespace HelperJobby.AutoMapperProfiles;

public class InterviewProfile : Profile
{
    public InterviewProfile()
    {
        CreateMap<Interview, InterviewDTO>().AfterMap((src, dest, context) =>
        {
            dest.JobSeekerAccount = context.Mapper.Map<JobSeekerAccount, JobSeekerAccountDTO>(src.JobSeekerAccount);
            dest.Job = context.Mapper.Map<Job, JobDTO>(src.Job);
        });
        
        CreateMap<InterviewDTO, Interview>().AfterMap((src, dest, context) =>
        {
            dest.JobSeekerAccount = context.Mapper.Map<JobSeekerAccountDTO, JobSeekerAccount>(src.JobSeekerAccount);
            dest.Job = context.Mapper.Map<JobDTO, Job>(src.Job);
        });
    }
}
