using ApplicationDomain.Exceptions;
using FluentValidation;
using HelperJobby.DTOs.Account;

namespace HelperJobby.Validators;

public class UpdateEmployerAccountDTOValidator : AbstractValidator<UpdateEmployerAccountDTO>
{
    private UpdateEmployerAccountDTOValidator()
    {
    }

    public static void ValidateUser(UpdateEmployerAccountDTO user)
    {
        if (!string.IsNullOrEmpty(user.Email)) CommonValidator.BeValidEmail(user.Email);

        if (!string.IsNullOrEmpty(user.ContactNumber)) CommonValidator.BeValidPhoneNumber(user.ContactNumber);
        var validator = new UpdateEmployerAccountDTOValidator();
        var validationResult = validator.Validate(user);

        if (!validationResult.IsValid) throw new InvalidEmployerAccountException(validationResult.ToString());
    }
}