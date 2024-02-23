using ApplicationDomain.Exceptions;
using FluentValidation;
using HelperJobby.DTOs.Resume;

namespace HelperJobby.Validators;

public class CreateEducationDTOValidator : AbstractValidator<CreateUpdateEducationDTO>
{
    public CreateEducationDTOValidator()
    {
        RuleFor(e => e.LevelOfEducation).Cascade(CascadeMode.Stop)
            .NotEmpty().WithMessage("You can not provide an empty level of education")
            .MaximumLength(30).WithMessage("Maximum length of level of education field exceeded");
    }

    public static void ValidateCreatedEducation(CreateUpdateEducationDTO updateEducation)
    {
        var validator = new CreateEducationDTOValidator();
        var validationResult = validator.Validate(updateEducation);

        if (!validationResult.IsValid) throw new InvalidEducationException(validationResult.ToString());
    }
}