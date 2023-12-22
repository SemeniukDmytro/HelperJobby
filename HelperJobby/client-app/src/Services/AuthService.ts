import HttpInternalService from "./HttpInternalService";
import {CreateUserDTO} from "../DTOs/UserDTOs/CreateUserDTO";
import {AuthUserDTO} from "../DTOs/UserDTOs/AuthUserDTO";

class AuthService {
    private readonly baseURI : string = "api/auth";
    private readonly httpInternalService : HttpInternalService;
    constructor() {
        this.httpInternalService = new HttpInternalService();
    }
    
    public async isEmailRegistered(email : string) : Promise<boolean>{
        return (await this.httpInternalService.getRequest(`${this.baseURI}/is-registered?email=${email}`)).json()
    }

    public async registerNewUser(createdUser: CreateUserDTO): Promise<AuthUserDTO> {
        return (await this.httpInternalService.requestWithCookies(`${this.baseURI}/sign-up`, "POST", createdUser)).json();
    }
    
    public async refreshToken(): Promise<AuthUserDTO>{
        return (await this.httpInternalService.requestWithCookies(`${this.baseURI}/refresh-token`, "POST",
            null, {"Authorization" : `Bearer ${localStorage.getItem("authToken")}`})).json()
    }
    
}

export default  AuthService