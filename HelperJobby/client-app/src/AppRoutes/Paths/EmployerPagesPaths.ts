const basePath = '/employers';

const createPath = (path : string) => `${basePath}${path}`;

const AppPaths = {
    JOB_POSTING: createPath('/posting'),
    EMPLOYER_SETUP: createPath('/setup-employer'),
    ADD_JOB_BASICS: createPath('/posting/getting-started'),
    JOB_DETAILS : createPath('/posting/job-details'),
    COMPENSATION_DETAILS : createPath('/posting/compensation-details')
};

export default AppPaths;