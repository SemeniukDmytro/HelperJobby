using Newtonsoft.Json;

namespace ApplicationDomain.LocationRelatedModels;

public class Prediction
{
    [JsonProperty("description")]
    public string Description { get; set; }
}