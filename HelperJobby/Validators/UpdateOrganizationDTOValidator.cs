using FluentValidation;
using HelperJobby.DTOs.Organization;

namespace HelperJobby.Validators;

public class UpdateOrganizationDTOValidator : AbstractValidator<UpdateOrganizationDTO>
{
    public static void ValidateOrganization(UpdateOrganizationDTO organizationDTO)
    {
        if (!string.IsNullOrEmpty(organizationDTO.PhoneNumber))
            CommonValidator.BeValidPhoneNumber(organizationDTO.PhoneNumber);
    }
}