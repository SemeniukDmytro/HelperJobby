export function getAuthToken(): string | null {
    return localStorage.getItem("accessToken");
}

export function setAuthToken(token: string) {
    localStorage.setItem("accessToken", token);
}

export function removeAuthToken() {
    localStorage.removeItem("accessToken");
}