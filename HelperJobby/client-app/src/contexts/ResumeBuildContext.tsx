import {createContext, ReactNode, useState} from "react";
import {ResumeBuildContextProps} from "../contextTypes/ResumeBuildContextProps";

const ResumeBuildContext = createContext<ResumeBuildContextProps>(
    {
        progressPercentage : null,
        setProgressPercentage : () => {}
    }
);

export function ResumeBuildContextProvider ({children} : {children : ReactNode}) {
    const [progressPercentage, setProgressPercentage] = useState<number | null>(20);
    
    return (
        <ResumeBuildContext.Provider value={
            {
                progressPercentage,
                setProgressPercentage
            }}>
            {children}
        </ResumeBuildContext.Provider>
    )
}

export default ResumeBuildContext;