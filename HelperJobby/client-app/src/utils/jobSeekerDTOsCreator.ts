import {UpdateJobSeekerAccountDTO} from "../DTOs/accountDTOs/UpdateEmployerAccountDTO";
import {AddressDTO} from "../DTOs/addressDTOs/AddressDTO";
import {UpdateAddressDTO} from "../DTOs/addressDTOs/UpdateAddressDTO";

export function createUpdateJobSeekerDTO(firstName : string, lastName : string, phoneNumber : string, address : UpdateAddressDTO) : UpdateJobSeekerAccountDTO{
    return {
        firstName,
        lastName,
        phoneNumber,
        address
    };
}