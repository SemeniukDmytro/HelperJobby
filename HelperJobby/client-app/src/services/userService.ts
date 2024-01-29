import CustomFetchService from "./customFetchService";
import {UserDTO} from "../DTOs/userRelatedDTOs/UserDTO";
import {CreateUpdateUserDTO} from "../DTOs/userRelatedDTOs/CreateUpdateUserDTO";
import {RecentUserSearchDTO} from "../DTOs/userRelatedDTOs/RecentUserSearchDTO";
import {UpdateUserWIthCurrentPasswordDTO} from "../DTOs/userRelatedDTOs/UpdateUserWIthCurrentPasswordDTO";

export class UserService{
    private readonly baseURI : string = "api/user";
    private readonly customFetchService : CustomFetchService;
    constructor() {
        this.customFetchService = new CustomFetchService()
    }

    public async getUser(userId : number) : Promise<UserDTO>{
        return (await this.customFetchService.get<UserDTO>(`${this.baseURI}/${userId}`));
    }
    public async getCurrentUser() : Promise<UserDTO>{
        return (await this.customFetchService.get<UserDTO>(`${this.baseURI}/current-user`));
    }

    public async updateUser(id: number, updatedUser: CreateUpdateUserDTO): Promise<UserDTO> {
        return await this.customFetchService.put<UserDTO>(`${this.baseURI}/${id}`, updatedUser);
    }

    public async updateUserVulnerableInfo(id: number, updatedUser: UpdateUserWIthCurrentPasswordDTO): Promise<UserDTO> {
        return await this.customFetchService.put<UserDTO>(`${this.baseURI}/vulnerable-info/${id}`, updatedUser);
    }

    public async getUserRecentSearches(): Promise<RecentUserSearchDTO[]> {
        return await this.customFetchService.get<RecentUserSearchDTO[]>(`${this.baseURI}/recent-searches`);
    }

    public async deleteUserRecentSearch(searchId: number): Promise<void> {
        await this.customFetchService.delete<void>(`${this.baseURI}/remove-search/${searchId}`);
    }
}