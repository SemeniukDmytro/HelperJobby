const headers = {
    "Accept" : "application/json",
    "Content-type" : "application/json"
}

function joinURL(baseUrl: string, url : string) : string{
    return `${baseUrl}/${url}`;
}

class AuthService {
    private readonly domain : string;
    constructor() {
       this.domain = "https://localhost:7214/api/auth";
    }
    
    
    async request(url : string, method = "POST", data=null){
        url = joinURL(this.domain, url);
        const options = {
            headers,
            method,
            body : data ? JSON.stringify(data) : null
        }
        
        return fetch(url, options);
    }
    
    public async IsEmailRegistered(url : string) : Promise<boolean>{
        return this.request(url).then(res => res.json())
    }
}

export default  AuthService