using Newtonsoft.Json;

namespace ApplicationDomain.LocationRelatedModels;

public class GoogleMapsResult
{
    [JsonProperty("predictions")]
    public List<Prediction> Predictions { get; set; }

    [JsonProperty("status")]
    public string Status { get; set; }
}