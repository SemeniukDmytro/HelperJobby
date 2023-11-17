using ApplicationDomain.Exceptions;
using FluentValidation;
using HelperJobby.DTOs.Resume;

namespace HelperJobby.Validators;

public class CreateEducationDTOValidator : AbstractValidator<CreateEducationDTO>
{
    public CreateEducationDTOValidator()
    {
        RuleFor(e => e.LevelOfEducation).Cascade(FluentValidation.CascadeMode.Stop)
            .NotEmpty().WithMessage("You can not provide an empty level of education")
            .MaximumLength(30).WithMessage("Maximum length of level of education field exceeded");
    }
    
    public static void ValidateCreatedEducation(CreateEducationDTO education)
    {
        var validator = new CreateEducationDTOValidator();
        var validationResult = validator.Validate(education);

        if (!validationResult.IsValid)
        {
            throw new InvalidEducationException(validationResult.ToString());
        }
    }
}