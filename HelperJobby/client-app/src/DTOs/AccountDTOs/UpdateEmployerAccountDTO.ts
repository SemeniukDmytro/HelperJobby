import {UpdateAddressDTO} from "../AddressDTOs/UpdateAddressDTO";

export interface UpdatedJobSeekerAccountDTO {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: UpdateAddressDTO;
}