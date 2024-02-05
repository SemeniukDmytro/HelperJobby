import {createContext, MutableRefObject, ReactNode, useState} from "react";
import {JobQueryParamsContextProps} from "../contextTypes/JobQueryParamsContextProps";
import JobTypes from "../enums/modelDataEnums/JobTypes";

export const JobQueryParamsContext = createContext<JobQueryParamsContextProps>({
    query: "",
    setQuery: () => {
    },
    jobLocation: "",
    setJobLocation: () => {
    },
    start: 0,
    setStart: () => {
    },
    isRemote: false,
    setIsRemote: () => {
    },
    pay: 0,
    setPay: () => {
    },
    jobType: 0,
    setJobType: () => {
    },
    language: "",
    setLanguage: () => {
    },
    mainContentReferenceForSearch: null,
    setMainContentRefForSearch: () => {
    }
});

export function JobQueryParamsProvider({children}: { children: ReactNode }) {
    const [job, setJob] = useState("");
    const [location, setLocation] = useState("");
    const [start, setStart] = useState(0);
    const [isRemote, setIsRemote] = useState(false);
    const [pay, setPay] = useState(0);
    const [jobType, setJobType] = useState<JobTypes>(0);
    const [language, setLanguage] = useState("");
    const [mainContentReference, setMainContentRef] = useState<MutableRefObject<HTMLDivElement | null> | null>(null);

    const contextValue: JobQueryParamsContextProps = {
        query: job,
        setQuery: setJob,
        jobLocation: location,
        setJobLocation: setLocation,
        start,
        setStart,
        isRemote,
        setIsRemote,
        pay,
        setPay,
        jobType,
        setJobType,
        language,
        setLanguage,
        mainContentReferenceForSearch: mainContentReference,
        setMainContentRefForSearch: setMainContentRef
    };

    return (
        <JobQueryParamsContext.Provider value={contextValue}>
            {children}
        </JobQueryParamsContext.Provider>
    );
}

export default JobQueryParamsContext;