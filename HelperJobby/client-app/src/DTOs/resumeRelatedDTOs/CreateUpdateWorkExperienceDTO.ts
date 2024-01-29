export interface CreateUpdateWorkExperienceDTO {
    jobTitle?: string;
    company?: string;
    country?: string;
    cityOrProvince?: string;
    from?: string;
    to?: string;
    currentlyWorkHere: boolean;
    description?: string;
}