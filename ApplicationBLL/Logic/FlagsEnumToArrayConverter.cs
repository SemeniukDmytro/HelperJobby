namespace ApplicationBLL.Logic;

public static class FlagsEnumToArrayConverter
{
    public static T GetSingleValue<T>(List<T> enumList) where T : Enum
    {
        return (T)Enum.ToObject(typeof(T), enumList.Sum(enumValue => Convert.ToInt32(enumValue)));
    }

    public static List<T> GetArrayWithEnumValues<T>(int singleEnumValue) where T : Enum
    {
        string binaryEnumValuesRepresentation = Convert.ToString(singleEnumValue, 2); 
        var results = binaryEnumValuesRepresentation
            .Select((num, ind) => (binaryEnumValuesRepresentation.Length - ind - 1, num == '1'))
            .Where(t => t.Item2)
            .Select(t => (T)Enum.ToObject(typeof(T), 1 << t.Item1))
            .ToList();
        
        return results;
    }
    
    public static List<string> GetArrayWithStringValues<T>(int singleEnumValue) where T : Enum
    {
        string binaryEnumValuesRepresentation = Convert.ToString(singleEnumValue, 2); 
        var results = binaryEnumValuesRepresentation
            .Select((num, ind) => (binaryEnumValuesRepresentation.Length - ind - 1, num == '1'))
            .Where(t => t.Item2)
            .Select(t => Enum.GetName(typeof(T), 1 << t.Item1)) 
            .ToList();
    
        return results;
    }
}