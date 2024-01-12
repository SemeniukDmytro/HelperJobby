import React, {Dispatch, FC, MutableRefObject, SetStateAction, useEffect, useState} from 'react';
import './DetailedDescriptionColumn.scss';
import JobDescriptionHeader from "../JobDescriptionHeader/JobDescriptionHeader";
import JobDetailsScrollWindow from "../JobDetailsScrollWindow/JobDetailsScrollWindow";
import {JobDTO} from "../../../../DTOs/jobRelatetedDTOs/JobDTO";

interface DetailedDescriptionColumnProps {
    selectedJob: JobDTO | null;
    isFullHeaderGridTemplate: number | null;
    setIsFullHeaderGridTemplate: Dispatch<SetStateAction<number | null>>;
    isShortHeaderGridTemplate: number | null;
    setIsShortHeaderGridTemplate: Dispatch<SetStateAction<number | null>>;
    mainContentReference: MutableRefObject<HTMLDivElement | null> | null;

}

const DetailedDescriptionColumn: FC<DetailedDescriptionColumnProps> = ({
                                                                           selectedJob,
                                                                           isFullHeaderGridTemplate,
                                                                           setIsFullHeaderGridTemplate,
                                                                           isShortHeaderGridTemplate,
                                                                           setIsShortHeaderGridTemplate,
                                                                           mainContentReference
                                                                       }) => {

    const [stickyHeight, setStickyHeight] = useState(361.2);

    useEffect(() => {
        updateStickyHeight();
        const handleScroll = () => {
            updateStickyHeight();
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [stickyHeight]);

    const updateStickyHeight = () => {
        let newHeight = 361.2 + window.scrollY;
        if (newHeight > 698) {
            setStickyHeight(698)
        } else {
            setStickyHeight(newHeight);
        }
    };

    return (
        <div className={"detailed-description-column"}>
            <div style={{height: `${stickyHeight}px`}} className={"detailed-description-sticky"}>
                <div className={"detailed-description-content-box"}>
                    <JobDescriptionHeader selectedJob={selectedJob} isFullHeaderGridTemplate={isFullHeaderGridTemplate}
                                          setIsFullHeaderGridTemplate={setIsFullHeaderGridTemplate}
                                          isShortHeaderGridTemplate={isShortHeaderGridTemplate}
                                          setIsShortHeaderGridTemplate={setIsShortHeaderGridTemplate}></JobDescriptionHeader>
                    <JobDetailsScrollWindow selectedJob={selectedJob}
                                            setIsFullHeaderGridTemplate={setIsFullHeaderGridTemplate}
                                            setIsShortHeaderGridTemplate={setIsShortHeaderGridTemplate}
                                            mainContentReference={mainContentReference}></JobDetailsScrollWindow>
                </div>
            </div>
        </div>
    )
};

export default DetailedDescriptionColumn;
