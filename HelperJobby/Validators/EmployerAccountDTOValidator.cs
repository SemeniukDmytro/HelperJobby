using ApplicationDomain.Exceptions;
using FluentValidation;
using HelperJobby.DTOs.Account;

namespace HelperJobby.Validators;

public class EmployerAccountDTOValidator : AbstractValidator<CreateEmployerAccountDTO>
{
    public EmployerAccountDTOValidator()
    {
        RuleFor(ea => ea.FullName).Cascade(CascadeMode.Stop)
            .NotEmpty().WithMessage("Provide your full name")
            .MaximumLength(60).WithMessage("You exceeded maximum length of full name");
        RuleFor(ea => ea.ContactEmail).Cascade(CascadeMode.Stop)
            .NotEmpty().WithMessage("You can not have an empty email")
            .Length(4, 50).WithMessage("Length of your Email is invalid")
            .Must(CommonValidator.BeValidEmail).WithMessage("Please enter a valid email");
    }
    
    public static void ValidateAccount(CreateEmployerAccountDTO account)
    {
        var validator = new EmployerAccountDTOValidator();
        var validationResult = validator.Validate(account);

        if (!validationResult.IsValid)
        {
            throw new InvalidEmployerAccountException(validationResult.ToString());
        }
    }
}