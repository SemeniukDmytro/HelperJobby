using ApplicationDomain.Models;
using AutoMapper;
using HelperJobby.DTOs.Resume;
using EducationDTO = HelperJobby.DTOs.Resume.EducationDTO;
using ResumeDTO = HelperJobby.DTOs.Resume.ResumeDTO;
using SkillDTO = HelperJobby.DTOs.Resume.SkillDTO;

namespace HelperJobby.AutoMapperProfiles;

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
        CreateMap<CreateSkillDTO, Skill>();
    }
}