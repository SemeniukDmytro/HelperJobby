using ApplicationDomain.Exceptions;
using FluentValidation;
using HelperJobby.DTOs.Account;

namespace HelperJobby.Validators;

public class UpdateEmployerDTOValidator : AbstractValidator<UpdateEmployerDTO>
{
    private UpdateEmployerDTOValidator()
    {
    }

    public static void ValidateUser(UpdateEmployerDTO user)
    {
        if (!string.IsNullOrEmpty(user.Email)) CommonValidator.BeValidEmail(user.Email);

        if (!string.IsNullOrEmpty(user.ContactNumber)) CommonValidator.BeValidPhoneNumber(user.ContactNumber);
        var validator = new UpdateEmployerDTOValidator();
        var validationResult = validator.Validate(user);

        if (!validationResult.IsValid) throw new InvalidEmployerAccountException(validationResult.ToString());
    }
}