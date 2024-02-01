const basePath = '/employers';

const createPath = (path : string) => `${basePath}${path}`;

const AppPaths = {
    JOB_POSTING: createPath('/posting'),
    EMPLOYER_SETUP: createPath('/setup-employer'),
    ADD_JOB_BASICS: createPath('/posting/getting-started')
};

export default AppPaths;