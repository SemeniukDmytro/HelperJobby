using Xunit.Abstractions;

namespace API_IntegrationTests.TestHelpers;

public static class ExceptionsLogHelper
{
    public static async Task LogNotSuccessfulResponse(HttpResponseMessage response, ITestOutputHelper testOutputHelper)
    {
        if (!response.IsSuccessStatusCode)
        {
            var responseContent = await response.Content.ReadAsStringAsync();
            testOutputHelper.WriteLine($"Status Code: {response.StatusCode}");
            testOutputHelper.WriteLine($"Response Content: {responseContent}");
        }
    }
}