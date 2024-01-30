using ApplicationDomain.Exceptions;
using FluentValidation;
using HelperJobby.DTOs.Resume;

namespace HelperJobby.Validators;

public class CreateSkillDTOValidator : AbstractValidator<CreateSkillDTO>
{
    private CreateSkillDTOValidator()
    {
        RuleFor(s => s.Name).Cascade(CascadeMode.Stop)
            .NotEmpty().WithMessage("You can not provide an empty skill")
            .MaximumLength(30).WithMessage("Maximum length of skill name exceeded");
    }

    public static void ValidateCreatedSkill(CreateSkillDTO skill)
    {
        var validator = new CreateSkillDTOValidator();
        var validationResult = validator.Validate(skill);

        if (!validationResult.IsValid) throw new InvalidSkillException(validationResult.ToString());
    }
}