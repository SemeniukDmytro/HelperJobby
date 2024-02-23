using ApplicationBLL.Logic;
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
        CreateMap<Interview, InterviewDTO>().ForMember(dest => dest.InterviewType,
                opt => opt
                    .MapFrom(src => EnumToStringConverter.InterviewTypeToStringConverter(src.InterviewType)))
            .AfterMap((src, dest, context) =>
            {
                dest.JobSeeker = context.Mapper.Map<JobSeeker, JobSeekerDTO>(src.JobSeeker);
                dest.Job = context.Mapper.Map<Job, JobDTO>(src.Job);
            });

        CreateMap<InterviewDTO, Interview>().AfterMap((src, dest, context) =>
        {
            dest.JobSeeker = context.Mapper.Map<JobSeekerDTO, JobSeeker>(src.JobSeeker);
            dest.Job = context.Mapper.Map<JobDTO, Job>(src.Job);
        });

        CreateMap<CreateInterviewDTO, Interview>();
    }
}