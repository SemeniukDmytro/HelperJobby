import CustomFetchService from "./customFetchService";
import {OrganizationDTO} from "../DTOs/organizationDTOs/OrganizationDTO";

export class LocationAutocompleteService{
    private readonly baseURI: string = "api/LocationAutocomplete";
    private readonly customFetchService: CustomFetchService;
    
    constructor() {
        this.customFetchService = new CustomFetchService();
    }

    public async GetAutocompletesForStreetAddress(input: string, countryTld : string): Promise<string[]> {
        return await this.customFetchService.get<string[]>(`${this.baseURI}/street_addresses?input=${input}&countryTld=${countryTld}`);
    }

    public async GetAutocompletesForCities(input: string, countryTld : string): Promise<string[]> {
        return await this.customFetchService.get<string[]>(`${this.baseURI}/cities?input=${input}&countryTld=${countryTld}`);
    }
}