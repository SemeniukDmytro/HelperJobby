export interface CreateEmployerAccountDTO {
    email: string;
    fullName: string;
    contactNumber: string;
    organizationName: string;
    numberOfEmployees: number | null;
}