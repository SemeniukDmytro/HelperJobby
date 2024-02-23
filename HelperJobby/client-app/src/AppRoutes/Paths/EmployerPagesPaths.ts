const basePath = '/employers';

const createPath = (path : string) => `${basePath}${path}`;

 const employerPagesPaths = {
    EMPLOYER_SETUP: createPath('/setup-employer'),
    JOB_POSTING: createPath('/posting'),
    ADD_JOB_BASICS: createPath('/posting/getting-started'),
    JOB_DETAILS : createPath('/posting/job-details'),
    COMPENSATION_DETAILS : createPath('/posting/compensation-details'),
    DESCRIPTION_AND_APPLICATION_DETAILS : createPath('/posting/description-and-application-settings'),
    REVIEW_JOB_PAGE : createPath('/posting/review-job'),
    JOBS : createPath("/jobs"),
    EDIT_JOB : createPath("/editing"),
    CANDIDATES : createPath("/candidates"),
    RESUMES : createPath("/resumes"),
    JOB_APPLY_REVIEW : createPath("/review-job-apply"),
    EMPLOYER_INTERVIEWS : createPath("/interviews"),
    USERS : createPath("/organization/users"),
    EDIT_EMPLOYER : createPath("/employer-edit")
};

export default employerPagesPaths;