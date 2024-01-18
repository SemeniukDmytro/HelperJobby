import {UpdateAddressDTO} from "../addressDTOs/UpdateAddressDTO";

export interface UpdateJobSeekerAccountDTO {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: UpdateAddressDTO | null;
}