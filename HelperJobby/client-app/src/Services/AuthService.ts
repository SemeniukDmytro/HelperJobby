import httpInternalService from "./HttpInternalService";
import HttpInternalService from "./HttpInternalService";
import {CreateUserDTO} from "../DTOs/CreateUserDTO";

class AuthService {
    private readonly baseURI : string = "api/auth";
    private readonly httpInternalService : HttpInternalService;
    constructor() {
        this.httpInternalService = new HttpInternalService();
    }
    
    public async IsEmailRegistered(email : string) : Promise<boolean>{
        return (await this.httpInternalService.Request(`${this.baseURI}/is-registered?email=${email}`,"GET")).json()
    }

    public async RegisterNewUser(createdUser: CreateUserDTO): Promise<Response> {
        return await this.httpInternalService.Request(`${this.baseURI}/sign-up`, "POST", createdUser);
    }
    
}

export default  AuthService