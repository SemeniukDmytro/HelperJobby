using ApplicationCommon.DTOs.Resume;
using ApplicationDAL.Entities;
using AutoMapper;

namespace ApplicationBLL.AutoMapperProfiles;

public class SkillProfile : Profile
{
    public SkillProfile()
    {
        CreateMap<Skill, SkillDTO>().AfterMap((src, dest, context) =>
        {
            dest.Resume = context.Mapper.Map<Resume, ResumeDTO>(src.Resume);
        });
        CreateMap<EducationDTO, Education>().AfterMap((src, dest, context) =>
        {
            dest.Resume = context.Mapper.Map<ResumeDTO, Resume>(src.Resume);
        });
    }
}