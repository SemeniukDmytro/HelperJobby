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
    EDIT_JOB : createPath("/editing")
};

export default employerPagesPaths;