using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.LocationRelatedModels;
using Newtonsoft.Json;

namespace ApplicationBLL.Services;

public class LocationService : ILocationService
{
    private const string GoogleMapsApiUrl = "https://maps.googleapis.com/maps/api/";
    private const string StreetAddressType = "address";
    private const string CityAddressType = "(cities)";
    
    public async Task<List<string>> GetStreetAddressAutocomplete(string input, string countryCode)
    {
        return await GetLocationsResults(input, countryCode, StreetAddressType);
    }

    public async Task<List<string>> GetCityAutocomplete(string input, string countryCode)
    {
        return await GetLocationsResults(input, countryCode, CityAddressType);
    }

    public async Task<List<string>> GetJobLocationAutocomplete(string input)
    {
        return await GetLocationsResults(input, "", CityAddressType);
    }

    private async Task<List<string>> GetLocationsResults(string input, string countryCode, string resultType)
    {
        string apiKey = "AIzaSyCmQgLmZERug-nZ_7wd019pjoLOfg7J2LY";

        using (HttpClient client = new HttpClient())
        {
            var regionSpecification = string.IsNullOrEmpty(countryCode) ? "" : $"&components=country:{countryCode}";
            var requestURI =
                $"{GoogleMapsApiUrl}place/autocomplete/json?input={input}&key={apiKey}&types={resultType}{regionSpecification}";
            
            HttpResponseMessage response = await client.GetAsync(requestURI);

            if (response.IsSuccessStatusCode)
            {
                var data = await response.Content.ReadAsStringAsync();
                var googleMapsResult = JsonConvert.DeserializeObject<GoogleMapsResult>(data);

                if (googleMapsResult.Status == "OK" && googleMapsResult.Predictions.Any())
                {
                    var descriptions = googleMapsResult.Predictions
                        .Select(prediction => prediction.Description)
                        .ToList();

                    return descriptions;
                }
            }

            return new List<string>();

        }
    }
}