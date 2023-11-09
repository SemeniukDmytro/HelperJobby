using ApplicationDomain.Exceptions;
using FluentValidation;
using HelperJobby.DTOs.Account;

namespace HelperJobby.Validators;

public class UpdateEmployerAccountDTOValidator : AbstractValidator<UpdateEmployerAccountDTO>
{
    UpdateEmployerAccountDTOValidator()
    {
        RuleFor(a => a.Email)
            .Length(4, 50).WithMessage("Length of your Email is invalid").When(a => !string.IsNullOrEmpty(a.Email))
            .Must(CommonValidator.BeValidEmail).WithMessage("Please enter a valid email")
            .When(a => !string.IsNullOrEmpty(a.Email));

        RuleFor(a => a.ContactNumber)
            .Length(4, 15).WithMessage("Length of your Password is invalid")
            .When(a => !string.IsNullOrEmpty(a.ContactNumber))
            .Must(CommonValidator.BeValidPhoneNumber).WithMessage("Please enter valid phone number")
            .When(a => !string.IsNullOrEmpty(a.ContactNumber));
    }
    
    public static void ValidateUser(UpdateEmployerAccountDTO user)
    {
        var validator = new UpdateEmployerAccountDTOValidator();
        var validationResult = validator.Validate(user);

        if (!validationResult.IsValid)
        {
            throw new InvalidEmployerAccountException(validationResult.ToString());
        }
    }
}