import {UpdateAddressDTO} from "../addressDTOs/UpdateAddressDTO";

export interface UpdatedJobSeekerAccountDTO {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: UpdateAddressDTO;
}