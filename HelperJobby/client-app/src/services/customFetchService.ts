import {addAuthHeader} from "../utils/addAuthHeader";
import {ServerError} from "../DTOs/errorDTOs/ServerErrorDTO";

export const DEFAULT_HEADERS: { [key: string]: string } = {
    "Accept": "application/json",
    "Content-type": "application/json",
}
export const DOMAIN = "https://helperjobby.azurewebsites.net/";

class CustomFetchService {
    constructor() {
    }

    async get<T>(url: string, headers: { [key: string]: string } = {}): Promise<T> {
        const response = await this.request(url, "GET", null, headers);
        return response.json();
    }

    async post<T>(url: string, body: object | null, headers: { [key: string]: string } = {}): Promise<T> {
        const response = await this.request(url, "POST", body, headers);
        return response.json();
    }

    async put<T>(url: string, body: object | null, headers: { [key: string]: string } = {}): Promise<T> {
        const response = await this.request(url, "PUT", body, headers);
        return response.json();
    }

    async delete<T>(url: string, body?: object, headers: { [key: string]: string } = {}): Promise<T | void> {
        const response = await this.request(url, "DELETE", body || null, headers);
        try {
            let result = await response.json();
            return result;
        } catch (error) {
            return;
        }
    }

    private joinURL(baseUrl: string, url: string): string {
        return `${baseUrl}/${url}`;
    }

    private async request(url: string, method: string, data: object | null = null, customHeaders: {
        [key: string]: string
    } = {}) {

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
            credentials: "include" as RequestCredentials,
        };
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new ServerError("response is not ok", await response.json());
        }
        return response;
    }

}

export default CustomFetchService;