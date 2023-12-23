import CustomFetchService from "./customFetchService";
import {CreateUserDTO} from "../DTOs/userRelatedDTOs/CreateUserDTO";
import {AuthUserDTO} from "../DTOs/userRelatedDTOs/AuthUserDTO";

class AuthService {
    private readonly baseURI : string = "api/auth";
    private readonly httpInternalService : CustomFetchService;
    constructor() {
        this.httpInternalService = new CustomFetchService();
    }
    
    public async isEmailRegistered(email : string) : Promise<boolean>{
        return (await this.httpInternalService.getRequest(`${this.baseURI}/is-registered?email=${email}`)).json()
    }

    public async registerNewUser(createdUser: CreateUserDTO): Promise<AuthUserDTO> {
        return (await this.httpInternalService.requestWithCookies(`${this.baseURI}/sign-up`, "POST", createdUser)).json();
    }
    
    public async refreshToken(): Promise<AuthUserDTO>{
        return (await this.httpInternalService.requestWithCookies(`${this.baseURI}/refresh-token`, "POST",
            null)).json()
    }
    
}

export default  AuthService