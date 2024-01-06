import {countries} from "../AppConstData/CountriesData";

export function mapCountryWithTld(country : string){
    const countryObject = countries.find((c) => c.name === country);

    if (countryObject) {
        return countryObject.code;
    } else {
        return '';
    }
}