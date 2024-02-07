using ApplicationDomain.Enums;
using ApplicationDomain.Models;
using AutoMapper;
using HelperJobby.DTOs.Job;

namespace HelperJobby.AutoMapperProfiles.CustomConverters;


public class GenericBenefitsListToEnumResolver : IValueResolver<object, IncompleteJob, EmployeeBenefits?>
{
    public EmployeeBenefits? Resolve(object source, IncompleteJob destination, EmployeeBenefits? destMember, ResolutionContext context)
    {
        var benefitsProperty = source.GetType().GetProperty("Benefits");
        if (benefitsProperty == null)
        {
            throw new InvalidOperationException("Source type must have a 'Benefits' property.");
        }

        var benefitsValue = benefitsProperty.GetValue(source) as IEnumerable<EmployeeBenefits>;

        if (benefitsValue == null || !benefitsValue.Any())
        {
            return (EmployeeBenefits)0;
        }

        return benefitsValue.Aggregate((current, next) => current | next);
    }
}