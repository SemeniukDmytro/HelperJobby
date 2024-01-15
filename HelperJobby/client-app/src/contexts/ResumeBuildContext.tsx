import {createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState} from "react";
import {ResumeBuildContextProps} from "../contextTypes/ResumeBuildContextProps";
import {useJobSeeker} from "../hooks/useJobSeeker";


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
    const {jobSeeker, fetchJobSeeker } = useJobSeeker();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchJobSeeker();
    }, []);

    useEffect(() => {
        if (jobSeeker){
            setLoading(false)
        }
    }, [jobSeeker]);
    

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
