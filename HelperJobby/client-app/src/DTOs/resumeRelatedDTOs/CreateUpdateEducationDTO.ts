export interface CreateUpdateEducationDTO {
    levelOfEducation: string;
    fieldOfStudy?: string;
    schoolName?: string;
    country?: string;
    city?: string;
    from?: Date;
    to?: Date;
}