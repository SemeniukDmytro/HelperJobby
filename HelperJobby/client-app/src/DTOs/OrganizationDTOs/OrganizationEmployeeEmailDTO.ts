class OrganizationDTO {
}

export interface OrganizationEmployeeEmailDTO {
    id: number;
    email: string;
    organizationId: number;
    organization: OrganizationDTO;
}