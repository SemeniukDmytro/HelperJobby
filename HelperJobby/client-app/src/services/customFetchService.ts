const DEFAULT_HEADERS : { [key: string]: string } = {
    "Accept": "application/json",
    "Content-type": "application/json",
}
class CustomFetchService {
    private readonly domain : string;
    constructor() {
        this.domain = "https://localhost:7214";
    }

    private  joinURL(baseUrl: string, url : string) : string{
        return `${baseUrl}/${url}`;
    }

    private async request(url: string, method: string, data: object | null = null, customHeaders: { [key: string]: string } = {}) {
        url = this.joinURL(this.domain, url);

        let headers = {
            ...DEFAULT_HEADERS,
            ...customHeaders,
        };

        let accessToken = localStorage.getItem("accessToken");

        if (accessToken) {
            headers = {
                ...headers,
                Authorization: `Bearer ${accessToken}`,
            };
        }

        const options = {
            headers,
            method,
            body: data ? JSON.stringify(data) : null,
        };

        try {
            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(`Request failed with status: ${response.status}`);
            }

            return response;
        } catch (error) {
            console.error("Error in request:", error);
            throw error;    
        }
    }

    async getRequest(url: string, headers: { [key: string]: string } = {}): Promise<Response> {
        return this.request(url, 'GET', null, headers);
    }
    async createRequest(url: string, data: object, headers: { [key: string]: string } = {}): Promise<Response> {
        return this.request(url, 'POST', data,headers);
    }

    async updateRequest(url: string, data: object, headers: { [key: string]: string } = {}): Promise<Response> {
        return this.request(url, 'PUT', data, headers);
    }

    async deleteRequest(url: string, headers: { [key: string]: string } = {}): Promise<Response> {
        return this.request(url, 'DELETE', null, headers);
    }

    async requestWithCookies(url : string, method : string, data : object | null = null, customHeaders = {}){
        url = this.joinURL(this.domain, url);
        const headers = {
            ...DEFAULT_HEADERS,
            ...customHeaders,
        };

        const options = {
            headers,
            method,
            credentials : "include" as RequestCredentials,
            body: data ? JSON.stringify(data) : null,
        };

        return fetch(url, options);
    }

}

export default CustomFetchService;