import HttpInternalService from "./HttpInternalService";
import {UserDTO} from "../DTOs/UserDTOs/UserDTO";

export class UserService{
    private readonly baseURI : string = "api/user";
    private readonly httpInternalService : HttpInternalService;
    constructor() {
        this.httpInternalService = new HttpInternalService()
    }

    public async getCurrentUser() : Promise<UserDTO>{
        return (await this.httpInternalService.getRequest(`${this.baseURI}/current-user`)).json()
    }
}