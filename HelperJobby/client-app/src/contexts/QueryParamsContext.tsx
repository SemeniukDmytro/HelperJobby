import {createContext, ReactNode, useState} from "react";
import {QueryParamsContextProps} from "../contextTypes/QueryParamsContextProps";
import JobTypes from "../enums/JobTypes";

export const QueryParamsContext = createContext<QueryParamsContextProps>({
    start : 0,
    setStart : () => {},
    isRemote: false,
    setIsRemote : () => {},
    pay : 0,
    setPay : () => {},
    jobType : 0,
    setJobType : () => {},
    language : "",
    setLanguage : () => {}
    
});

export function QueryParamsProvider({children} : {children : ReactNode}) {
    const [start, setStart] = useState(0);
    const [isRemote, setIsRemote] = useState(false);
    const [pay, setPay] = useState(0);
    const [jobType, setJobType] = useState<JobTypes>(0);
    const [language, setLanguage] = useState("");

    const contextValue: QueryParamsContextProps = {
        start,
        setStart,
        isRemote,
        setIsRemote,
        pay,
        setPay,
        jobType,
        setJobType,
        language,
        setLanguage
    };

    return (
        <QueryParamsContext.Provider value={contextValue}>
            {children}
        </QueryParamsContext.Provider>
    );
}

export default QueryParamsContext;