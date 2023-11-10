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

        RuleFor(a => a.OrganizationName)
            .Cascade(CascadeMode.Stop)
            .NotEmpty().WithMessage("Provide a name of your organization")
            .Length(1, 100).WithMessage("Length of your organizationName is invalid");
    }
    
    public static void ValidateAccount(CreateEmployerAccountDTO account)
    {
        if (!string.IsNullOrEmpty(account.Email))
        {
            CommonValidator.BeValidEmail(account.Email);
        }

        if (!string.IsNullOrEmpty(account.ContactNumber))
        {
            CommonValidator.BeValidPhoneNumber(account.ContactNumber);
        }
        var validator = new EmployerAccountDTOValidator();
        var validationResult = validator.Validate(account);

        if (!validationResult.IsValid)
        {
            throw new InvalidEmployerAccountException(validationResult.ToString());
        }
    }
}