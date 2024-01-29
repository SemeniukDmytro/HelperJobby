import CustomFetchService, {DEFAULT_HEADERS, DOMAIN} from "./customFetchService";
import {CreateUpdateUserDTO} from "../DTOs/userRelatedDTOs/CreateUpdateUserDTO";
import {AuthUserDTO} from "../DTOs/userRelatedDTOs/AuthUserDTO";
import {getAuthToken} from "../utils/authTokenInteraction";
import {LoginUserDTO} from "../DTOs/userRelatedDTOs/LoginUserDTO";

class AuthService {
    private readonly baseURI : string = "api/auth";
    private readonly customFetchService : CustomFetchService;
    constructor() {
        this.customFetchService = new CustomFetchService();
    }
    
    public async isEmailRegistered(email : string) : Promise<boolean>{
        return (await this.customFetchService.get<boolean>(`${this.baseURI}/is-registered?email=${email}`));
    }

    public async register(createdUserDTO: CreateUpdateUserDTO): Promise<AuthUserDTO> {
        return (await this.customFetchService.post<AuthUserDTO>(`${this.baseURI}/sign-up`, createdUserDTO));
    }
    
    public async login(loginUserDTO : LoginUserDTO) : Promise<AuthUserDTO>{
        return (await this.customFetchService.post<AuthUserDTO>(`${this.baseURI}/sign-in`, loginUserDTO));
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
    
    public async revokeToken(){
        return await this.customFetchService.delete<void>(`${this.baseURI}/revoke-token`);
    }
    
}

export default  AuthService