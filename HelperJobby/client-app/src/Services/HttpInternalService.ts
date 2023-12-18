const headers = {
    "Accept" : "application/json",
    "Content-type" : "application/json"
}
class HttpInternalService {
    private readonly domain : string;
    constructor() {
        this.domain = "https://localhost:7214";
    }

    private  JoinURL(baseUrl: string, url : string) : string{
        return `${baseUrl}/${url}`;
    }

    async Request(url : string, method : string, data : object | null = null){
        url = this.JoinURL(this.domain, url);
        const options = {
            headers,
            method,
            body : data ? JSON.stringify(data) : null
        }

        return fetch(url, options);
    }

}

export default HttpInternalService;