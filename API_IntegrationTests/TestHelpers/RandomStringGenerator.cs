using System.Text;

namespace API_IntegrationTests.TestHelpers;

public class RandomStringGenerator
{
    private static Random random = new Random();

    public static string GenerateRandomEmail()
    {
        string localPart = GenerateRandomString(10); 
        string domain = "@testdomain.com";
        return localPart + domain;
    }
    
    public static string GenerateRandomNumberWithPlus(int length)
    {
        var stringBuilder = new StringBuilder();
        stringBuilder.Append('+'); // Start with '+'

        for (int i = 0; i < length; i++)
        {
            stringBuilder.Append(random.Next(0, 10));
        }

        return stringBuilder.ToString();
    }

    public static string GenerateRandomString(int length)
    {
        const string chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        var stringChars = new char[length];
        for (int i = 0; i < length; i++)
        {
            stringChars[i] = chars[random.Next(chars.Length)];
        }
        return new String(stringChars);
    }
}