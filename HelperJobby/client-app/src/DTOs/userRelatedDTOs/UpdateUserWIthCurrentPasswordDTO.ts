export interface UpdateUserWIthCurrentPasswordDTO {
    email: string;
    password: string;
    accountType: string;
    currentPassword: string;
}