using ApplicationDomain.Models;
using AutoMapper;
using HelperJobby.DTOs.Account;
using HelperJobby.DTOs.Job;
using HelperJobby.DTOs.UserJobInteractions;

namespace HelperJobby.AutoMapperProfiles;

public class SavedJobProfile : Profile
{
    public SavedJobProfile()
    {
        CreateMap<SavedJob, SavedJobDTO>().AfterMap((src, dest, context) =>
        {
            dest.JobSeekerAccount = context.Mapper.Map<JobSeekerAccount, JobSeekerAccountDTO>(src.JobSeekerAccount);
            dest.Job = context.Mapper.Map<Job, JobDTO>(src.Job);
        });

        CreateMap<SavedJobDTO, SavedJob>().AfterMap((src, dest, context) =>
        {
            dest.JobSeekerAccount = context.Mapper.Map<JobSeekerAccountDTO, JobSeekerAccount>(src.JobSeekerAccount);
            dest.Job = context.Mapper.Map<JobDTO, Job>(src.Job);
        });
    }
}