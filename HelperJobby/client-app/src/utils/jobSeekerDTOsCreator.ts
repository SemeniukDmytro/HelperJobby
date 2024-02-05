import {UpdateJobSeekerDTO} from "../DTOs/accountDTOs/UpdateJobSeekerDTO";
import {UpdateAddressDTO} from "../DTOs/addressDTOs/UpdateAddressDTO";

export function updateJobSeekerDTO(firstName: string, lastName: string, phoneNumber: string,
                                   address: UpdateAddressDTO | null): UpdateJobSeekerDTO {
    return {
        firstName,
        lastName,
        phoneNumber,
        address
    };
}