import React, {FC} from 'react';
import ShortJobDescriptionBlock from "../ShortJobDescriptionBlock/ShortJobDescriptionBlock";
import "./RecommendedJobs.scss";
import DetailedDescriptionColumn from "../DetailedDescriptionColumn/DetailedDescriptionColumn";
import {useHomePage} from "../../../../hooks/contextHooks/useHomePage";

interface RecommendedJobsProps {
}

const RecommendedJobs: FC<RecommendedJobsProps> = () => {
    const {
        recommendedJobs, selectedJob, setSelectedJob,
        isShortHeaderGridTemplate, setIsShortHeaderGridTemplate,
        isFullHeaderGridTemplate, setIsFullHeaderGridTemplate, mainContentReferenceForHome
    } = useHomePage();

    return (
        <div className={"jobs-container"}>
            {recommendedJobs.length > 0 &&
                <>
                    <div className={"short-job-descriptions-column"}>
                        <div className={"title-container"}>
                            <span>Jobs based on your activity on indeed</span>
                        </div>
                        {recommendedJobs.map((job, index) => (
                            <ShortJobDescriptionBlock
                                key={index} job={job}
                                selectedJob={selectedJob}
                                setSelectedJob={setSelectedJob}
                            ></ShortJobDescriptionBlock>
                        ))}
                    </div>
                    <DetailedDescriptionColumn
                        isFullHeaderGridTemplate={isFullHeaderGridTemplate}
                        setIsFullHeaderGridTemplate={setIsFullHeaderGridTemplate}
                        isShortHeaderGridTemplate={isShortHeaderGridTemplate}
                        setIsShortHeaderGridTemplate={setIsShortHeaderGridTemplate}
                        mainContentReference={mainContentReferenceForHome}
                        selectedJob={selectedJob}
                    />
                </>
            }
        </div>
    )
};

export default RecommendedJobs;
