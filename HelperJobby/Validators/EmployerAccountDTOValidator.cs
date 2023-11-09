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
        
        RuleFor(ea => ea.Email).Cascade(CascadeMode.Stop)
            .NotEmpty().WithMessage("You can not have an empty email")
            .Length(4, 50).WithMessage("Length of your Email is invalid")
            .Must(CommonValidator.BeValidEmail).WithMessage("Please enter a valid email");
        
        RuleFor(a => a.ContactNumber)
            .Cascade(CascadeMode.Stop)
            .Length(4, 15).WithMessage("Length of your number is invalid")
            .Must(CommonValidator.BeValidPhoneNumber).WithMessage("Please enter a valid phone number")
            .When(a => !string.IsNullOrWhiteSpace(a.ContactNumber));

        RuleFor(a => a.OrganizationName)
            .Cascade(CascadeMode.Stop)
            .NotEmpty().WithMessage("Provide a name of your organization")
            .Length(1, 100).WithMessage("Length of your organizationName is invalid");
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