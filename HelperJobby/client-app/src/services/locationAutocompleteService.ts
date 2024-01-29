import CustomFetchService from "./customFetchService";

export class LocationAutocompleteService{
    private readonly baseURI: string = "api/LocationAutocomplete";
    private readonly customFetchService: CustomFetchService;
    
    constructor() {
        this.customFetchService = new CustomFetchService();
    }

    public async GetAutocompletesForStreetAddress(input: string, countryA2code : string): Promise<string[]> {
        return await this.customFetchService.get<string[]>(`${this.baseURI}/street_addresses?input=${input}&countryA2code=${countryA2code}`);
    }

    public async GetAutocompletesForCities(input: string, countryA2code : string): Promise<string[]> {
        return await this.customFetchService.get<string[]>(`${this.baseURI}/cities?input=${input}&countryA2code=${countryA2code}`);
    }

    public async GetAutocompletesForJobLocation(input: string): Promise<string[]> {
        return await this.customFetchService.get<string[]>(`${this.baseURI}/job-location?input=${input}`);
    }
}