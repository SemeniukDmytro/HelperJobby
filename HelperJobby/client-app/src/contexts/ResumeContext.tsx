import {createContext, ReactNode, useEffect, useState} from "react";
import {ResumeBuildContextProps} from "../contextTypes/ResumeBuildContextProps";
import {useJobSeeker} from "../hooks/useJobSeeker";
import {ResumeService} from "../services/resumeService";
import {ServerError} from "../ErrorDTOs/ServerErrorDTO";
import {logErrorInfo} from "../utils/logErrorInfo";
import LoadingPage from "../Components/LoadingPage/LoadingPage";
import PageWrapWithHeader from "../Components/Header/PageWrapWithHeader/PageWrapWithHeader";


const ResumeContext = createContext<ResumeBuildContextProps>({
    progressPercentage: null,
    setProgressPercentage: () => {
    },
    saveFunc: async () => {
    },
    setSaveFunc: () => {
    },
    showDialogWindow: false,
    setShowDialogWindow: () => {
    }
});

export function ResumeContextProvider({children}: { children: ReactNode }) {
    const [progressPercentage, setProgressPercentage] = useState<number | null>(12.5);
    const [currentSaveFunc, setCurrentSaveFunc] = useState<() => Promise<void>>(
        async () => {
        });
    const {jobSeeker, setJobSeeker, fetchJobSeeker} = useJobSeeker();
    const [loading, setLoading] = useState(true);
    const [showDialogWindow, setShowDialogWindow] = useState(false);
    const resumeService = new ResumeService();

    useEffect(() => {
        fetchJobSeeker();
    }, []);

    useEffect(() => {
        if (jobSeeker) {
            fetchResume();
        }
    }, [jobSeeker]);

    async function fetchResume() {

        try {
            if (!jobSeeker?.resume?.id) {
                return;
            }
            if (jobSeeker.resume.skills.length > 0 || jobSeeker.resume.workExperiences.length > 0 || jobSeeker.resume.educations.length > 0) {
                return;
            }
            const retrievedResume = await resumeService.getResume(jobSeeker.resume.id);
            const updatedJobSeeker = jobSeeker;
            updatedJobSeeker.resume = retrievedResume;
            setJobSeeker(updatedJobSeeker);
        } catch (err) {
            if (err instanceof ServerError) {
                logErrorInfo(err);
            }
        } finally {
            setLoading(false);
        }
    }

    const saveFunc = async () => {
        await currentSaveFunc();
    };

    return (

        <PageWrapWithHeader>
            {loading ? <LoadingPage/> :
                <ResumeContext.Provider
                    value={{
                        progressPercentage,
                        setProgressPercentage,
                        saveFunc,
                        setSaveFunc: setCurrentSaveFunc,
                        showDialogWindow,
                        setShowDialogWindow
                    }}
                >
                    {children}
                </ResumeContext.Provider>}
        </PageWrapWithHeader>
    );
}

export default ResumeContext;
