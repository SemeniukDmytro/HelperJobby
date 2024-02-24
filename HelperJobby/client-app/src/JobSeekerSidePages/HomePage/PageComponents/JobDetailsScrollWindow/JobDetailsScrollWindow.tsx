import React, {Dispatch, FC, MutableRefObject, SetStateAction, useEffect, useRef} from 'react';
import "./JobDetailScrollWindow.scss";
import {JobDTO} from "../../../../DTOs/jobRelatetedDTOs/JobDTO";
import DetailedJobInfo from "../../../../Components/DetailedJobInfo/DetailedJobInfo";

interface JobDetailsScrollWindowProps {
    selectedJob: JobDTO | null;
    setIsFullHeaderGridTemplate: Dispatch<SetStateAction<number | null>>;
    setIsShortHeaderGridTemplate: Dispatch<SetStateAction<number | null>>;
    mainContentReference: MutableRefObject<HTMLDivElement | null> | null;
}

const JobDetailsScrollWindow: FC<JobDetailsScrollWindowProps> = ({
                                                                     selectedJob,
                                                                     setIsFullHeaderGridTemplate,
                                                                     setIsShortHeaderGridTemplate,
                                                                     mainContentReference
                                                                 }) => {


    const jobDetailsScrollWindowRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (mainContentReference) {
                const mainContentY = mainContentReference.current!.getBoundingClientRect().top + window.scrollY;
                if (mainContentY > window.scrollY && jobDetailsScrollWindowRef.current!.scrollTop <= 10) {
                    window.scrollTo(0, mainContentY);
                }
                focusOnInnerContent()
            }
        };
        
        if (jobDetailsScrollWindowRef.current) {
            jobDetailsScrollWindowRef.current.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (jobDetailsScrollWindowRef.current) {
                jobDetailsScrollWindowRef.current.removeEventListener('scroll', handleScroll);
            }
        };
    }, [mainContentReference]);


    function focusOnInnerContent() {
        const scrollTop = jobDetailsScrollWindowRef.current?.scrollTop;
        if (scrollTop! !== 0) {
            setIsFullHeaderGridTemplate(0);
            setIsShortHeaderGridTemplate(1);
        } else {
            setIsFullHeaderGridTemplate(1);
            setIsShortHeaderGridTemplate(0);
        }
    }


    return (
        <div className={"job-details-scroll-window"} ref={jobDetailsScrollWindowRef}>
            <div className={"job-details-container"}>
                <DetailedJobInfo job={selectedJob!}/>
            </div>
        </div>
    )
};

export default JobDetailsScrollWindow;
