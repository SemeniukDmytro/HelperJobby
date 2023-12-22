import {UserDTO} from "./UserDTO";

export interface AuthUserDTO {
    user: UserDTO;
    token: string;
}