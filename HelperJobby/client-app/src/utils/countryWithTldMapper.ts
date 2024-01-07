import {countries} from "../AppConstData/CountriesData";

export function mapCountryWithA2Code(country : string){
    const countryObject = countries.find((c) => c.name === country);

    if (countryObject) {
        return countryObject.code;
    } else {
        return '';
    }
}