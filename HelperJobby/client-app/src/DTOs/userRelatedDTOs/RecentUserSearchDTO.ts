import {UserDTO} from "./UserDTO";

export interface RecentUserSearchDTO {
    id: number;
    query: string;
    location: string;
    userId: number;
    user: UserDTO;
}