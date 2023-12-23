export function setAuthHeader(headers : { [key: string]: string }) : { [key: string]: string } {
    let accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
        headers = {
            ...headers,
            Authorization: `Bearer ${accessToken}`,
        };
    }
    return headers;
}