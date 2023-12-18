import { UserDTO } from './UserDTO'; // Adjust the path accordingly

export interface AuthUserDTO {
    user: UserDTO;
    token: string;
}