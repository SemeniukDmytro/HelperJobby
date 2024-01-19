using ApplicationDomain.Attributes;
using ApplicationDomain.Enums;

namespace ApplicationBLL.Logic;

public class JobUpdateValidation<T>
{
    public static T Update<T>(T entityToUpdate, T updatedEntity)
    {
        var entityProperties = entityToUpdate.GetType().GetProperties();
        var updatedJobProperties = updatedEntity.GetType().GetProperties();

        foreach (var updatedProperty in updatedJobProperties)
        {
            if (Attribute.IsDefined(updatedProperty, typeof(ExcludeFromUpdateAttribute)))
            {
                continue;
            }
            
            var entityProperty = entityProperties.FirstOrDefault(p => p.Name == updatedProperty.Name);
            if (entityProperty != null)
            {
                var updatedValue = updatedProperty.GetValue(updatedEntity);
                var currentValue = entityProperty.GetValue(entityToUpdate);

                if (IsValid(updatedValue))
                {
                    entityProperty.SetValue(entityToUpdate, updatedValue);
                }
            }
        }

        return entityToUpdate;
    }
    
    private static bool IsValid(object value)
    {
        if (value is EmployeeBenefits)
        {
            return true;
        }
        
        if (value == null)
        {
            return false;
        }

        if (value is decimal)
        {
            return (decimal)value != 0.0m;
        }

        if (value is int)
        {
            return (int)value != 0;
        }

        if (value is Enum)
        {
            return (int)value != 0;
        }
        if (int.TryParse(value.ToString(), out var possibleInt))
        {
            return possibleInt != 0;
        }
    
        if (value is string && string.IsNullOrEmpty((string)value))
        {
            return false;
        }

        return true;
    }
}