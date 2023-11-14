using ApplicationDomain.Attributes;

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
            var valueOfProperty = updatedProperty.GetValue(updatedEntity);
            if (valueOfProperty != null && (valueOfProperty != default || (int)valueOfProperty == default))
            {
                var currentValue = entityProperty.GetValue(entityToUpdate);
                var newValue = updatedProperty.GetValue(updatedEntity);

                if (!Equals(currentValue, newValue) || currentValue == null || currentValue.Equals(default))
                {
                    entityProperty.SetValue(entityToUpdate, newValue);
                }
            }
        }

        return entityToUpdate;
    }
}