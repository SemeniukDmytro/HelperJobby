import {UpdateJobSeekerAccountDTO} from "../DTOs/accountDTOs/UpdateJobSeekerAccountDTO";
import {UpdateAddressDTO} from "../DTOs/addressDTOs/UpdateAddressDTO";

export function updateJobSeekerDTO(firstName: string, lastName: string, phoneNumber: string,
                                   address: UpdateAddressDTO | null): UpdateJobSeekerAccountDTO {
    return {
        firstName,
        lastName,
        phoneNumber,
        address
    };
}