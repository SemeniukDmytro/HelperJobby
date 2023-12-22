export interface CreateUpdateWorkExperienceDTO {
    jobTitle?: string;
    company?: string;
    country?: string;
    cityOrProvince?: string;
    from?: Date;
    to?: Date;
    currentlyWorkHere: boolean;
    description: string;
}