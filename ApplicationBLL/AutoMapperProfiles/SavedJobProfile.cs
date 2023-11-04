using ApplicationCommon.DTOs.Account;
using ApplicationCommon.DTOs.Job;
using ApplicationCommon.DTOs.UserJobInteractions;
using ApplicationDAL.Entities;
using AutoMapper;

namespace ApplicationBLL.AutoMapperProfiles;

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