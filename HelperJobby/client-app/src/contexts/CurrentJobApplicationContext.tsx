import {createContext, ReactNode, useState} from "react";
import {CurrentJobApplicationContextProps} from "../contextTypes/CurrentJobApplicationContextProps";
import {JobDTO} from "../DTOs/jobRelatetedDTOs/JobDTO";

const CurrentJobApplicationContext = createContext<CurrentJobApplicationContextProps>({
    job: null,
    setJob: () => {
    },
    showExitDialog: false,
    setShowExitDialog: () => {
    }
});

export function CurrentJobApplicationProvider({children}: { children: ReactNode }) {
    const [job, setJob] = useState<JobDTO | null>(null);
    const [showExitDialog, setShowExitDialog] = useState(false);

    return (
        <CurrentJobApplicationContext.Provider value={{
            job,
            setJob,
            showExitDialog,
            setShowExitDialog
        }}>
            {children}
        </CurrentJobApplicationContext.Provider>
    )
}

export default CurrentJobApplicationContext;