import CustomFetchService, {DEFAULT_HEADERS, DOMAIN} from "./customFetchService";
import {CreateUserDTO} from "../DTOs/userRelatedDTOs/CreateUserDTO";
import {AuthUserDTO} from "../DTOs/userRelatedDTOs/AuthUserDTO";
import {getAuthToken} from "../utils/AuthTokenInteraction";
import {LoginUserDTO} from "../DTOs/userRelatedDTOs/LoginUserDTO";

class AuthService {
    private readonly baseURI : string = "api/auth";
    private readonly httpInternalService : CustomFetchService;
    constructor() {
        this.httpInternalService = new CustomFetchService();
    }
    
    public async isEmailRegistered(email : string) : Promise<boolean>{
        return (await this.httpInternalService.getRequest(`${this.baseURI}/is-registered?email=${email}`)).json()
    }

    public async register(createdUserDTO: CreateUserDTO): Promise<AuthUserDTO> {
        return (await this.httpInternalService.postRequest(`${this.baseURI}/sign-up`, createdUserDTO)).json();
    }
    
    public async login(loginUserDTO : LoginUserDTO) : Promise<AuthUserDTO>{
        return (await this.httpInternalService.postRequest(`${this.baseURI}/sign-in`, loginUserDTO)).json();
    }
    
    public async refreshToken(): Promise<AuthUserDTO>{
        const url = `${DOMAIN}/${this.baseURI}/refresh-token`;
        
        const accessToken = getAuthToken();
        if (accessToken == null){
            throw new Error("Authorize please to proceed");
        }
        let headers = {...DEFAULT_HEADERS, "Authorization" : `Bearer ${accessToken}`};
        
        const options = {
            headers : headers,  
            method : "POST",
            credentials : "include" as RequestCredentials,
        }
        let response!: Response;
        try {
            response = await fetch(url, options);
        }
        catch (error){
            console.log(error);
        }
        
        return response.json();
    }
    
}

export default  AuthService