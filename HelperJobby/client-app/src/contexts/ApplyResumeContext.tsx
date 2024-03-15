import {createContext, ReactNode, useState} from "react";
import {ApplyResumeContextProps} from "../contextTypes/ApplyResumeContextProps";

const ApplyResumeContext = createContext<ApplyResumeContextProps>({
    jobId: null,
    setJobId: () => {
    }
})


export function ApplyResumeProvider({children}: { children: ReactNode }) {
    const [jobId, setJobId] = useState<number | null>(null);

    return (
        <ApplyResumeContext.Provider value={{
            jobId, setJobId
        }}>
            {children}
        </ApplyResumeContext.Provider>
    )
}

export default ApplyResumeContext;