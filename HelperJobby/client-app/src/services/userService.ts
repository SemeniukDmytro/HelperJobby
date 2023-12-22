import CustomFetchService from "./customFetchService";
import {UserDTO} from "../DTOs/userRelatedDTOs/UserDTO";

export class UserService{
    private readonly baseURI : string = "api/user";
    private readonly httpInternalService : CustomFetchService;
    constructor() {
        this.httpInternalService = new CustomFetchService()
    }

    public async getCurrentUser() : Promise<UserDTO>{
        return (await this.httpInternalService.getRequest(`${this.baseURI}/current-user`)).json()
    }
}