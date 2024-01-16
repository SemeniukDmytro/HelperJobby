import {createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState} from "react";
import {ResumeBuildContextProps} from "../contextTypes/ResumeBuildContextProps";
import {useJobSeeker} from "../hooks/useJobSeeker";
import {ResumeService} from "../services/resumeService";
import {ServerError} from "../ErrorDTOs/ServerErrorDTO";
import {logErrorInfo} from "../utils/logErrorInfo";


const ResumeBuildContext = createContext<ResumeBuildContextProps>({
    progressPercentage: null,
    setProgressPercentage: () => {},
    saveFunc: async () => {},
    setSaveFunc: () => {},
});

export function ResumeBuildContextProvider({ children }: { children: ReactNode }) {
    const [progressPercentage, setProgressPercentage] = useState<number | null>(20);
    const [currentSaveFunc, setCurrentSaveFunc] = useState<() => Promise<void>>(
        async () => {});
    const {jobSeeker, setJobSeeker, fetchJobSeeker } = useJobSeeker();
    const [loading, setLoading] = useState(true);
    const resumeService = new ResumeService();

    useEffect(() => {
        fetchJobSeeker();
    }, []);

    useEffect(() => {
        fetchResume();
    }, [jobSeeker]);
    
    async function fetchResume(){
        if (!jobSeeker?.resume.id){
            return;
        }
        try {
            const retrievedResume = await resumeService.getResume(jobSeeker.resume.id);
            const updatedJobSeeker = jobSeeker;
            updatedJobSeeker.resume = retrievedResume;
            setJobSeeker(updatedJobSeeker);
        }
        catch (err) {
            if (err instanceof ServerError){
                logErrorInfo(err);
            }
        }
        finally {
            setLoading(false)
        }
    }

    const saveFunc = async () => {
        await currentSaveFunc();
    };

    return (
        loading ? <>Loading...</> :
        <ResumeBuildContext.Provider
            value={{
                progressPercentage,
                setProgressPercentage,
                saveFunc,
                setSaveFunc: setCurrentSaveFunc,
            }}
        >
            {children}
        </ResumeBuildContext.Provider>
    );
}

export default ResumeBuildContext;
