import {addAuthHeader} from "../utils/addAuthHeader";
export const DEFAULT_HEADERS : { [key: string]: string } = {
    "Accept": "application/json",
    "Content-type": "application/json",
}
export const DOMAIN = "https://localhost:7214";

class CustomFetchService {
    constructor() {
    }

    private  joinURL(baseUrl: string, url : string) : string{
        return `${baseUrl}/${url}`;
    }

    private async request(url: string, method: string, data: object | null = null, customHeaders: { [key: string]: string } = {}) {
        
        url = this.joinURL(DOMAIN, url);
        let headers = {
            ...DEFAULT_HEADERS,
            ...customHeaders,
        };

        headers = await addAuthHeader(headers);

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

    async get<T>(url: string, headers: { [key: string]: string } = {}): Promise<T> {
        const response = await this.request(url, "GET", null, headers);
        return response.json();
    }

    async post<T>(url: string, body: object, headers: { [key: string]: string } = {}): Promise<T> {
        const response = await this.request(url, "POST", body, headers);
        return response.json();
    }

    async put<T>(url: string, body: object, headers: { [key: string]: string } = {}): Promise<T> {
        const response = await this.request(url, "PUT", body, headers);
        return response.json();
    }

    async delete<T>(url: string, headers: { [key: string]: string } = {}): Promise<T> {
        const response = await this.request(url, "DELETE", null, headers);
        return response.json();
    }

}

export default CustomFetchService;