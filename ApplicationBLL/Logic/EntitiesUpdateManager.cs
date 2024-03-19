using System.Reflection;
using ApplicationDomain.Attributes;
using ApplicationDomain.Enums;

namespace ApplicationBLL.Logic;

public static class EntitiesUpdateManager<T>
{
    public static T UpdateEntityProperties<T>(T entityToUpdate, T updatedEntity)
    {
        var entityProperties = entityToUpdate.GetType().GetProperties();
        var updatedJobProperties = updatedEntity.GetType().GetProperties();

        foreach (var updatedProperty in updatedJobProperties)
        {
            if (Attribute.IsDefined(updatedProperty, typeof(ExcludeFromUpdateAttribute))) continue;

            var entityProperty = entityProperties.FirstOrDefault(p => p.Name == updatedProperty.Name);
            if (entityProperty != null)
            {
                var updatedValue = updatedProperty.GetValue(updatedEntity);

                if (IsValid(entityProperty, updatedValue)) entityProperty.SetValue(entityToUpdate, updatedValue);
            }
        }

        return entityToUpdate;
    }

    private static bool IsValid(PropertyInfo propertyInfo, object? value)
    {
        if (value == null) return false;

        if (value is string stringValue)
        {
            var allowEmpty = propertyInfo.GetCustomAttribute<AllowEmptyStringAttribute>() != null;
            if (!allowEmpty && string.IsNullOrEmpty(stringValue)) return false;
            return true;
        }


        if (value is EmployeeBenefits) return true;

        if (value is Schedules) return true;

        if (value is decimal) return (decimal)value != 0.0m;

        if (value is int) return (int)value != 0;

        if (value is Enum) return (int)value != 0;
        if (int.TryParse(value.ToString(), out var possibleInt)) return possibleInt != 0;


        return true;
    }
}