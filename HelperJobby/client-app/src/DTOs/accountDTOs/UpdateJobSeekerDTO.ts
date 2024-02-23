import {UpdateAddressDTO} from "../addressDTOs/UpdateAddressDTO";

export interface UpdateJobSeekerDTO {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: UpdateAddressDTO | null;
}