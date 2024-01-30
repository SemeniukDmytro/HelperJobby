import React, {FC} from 'react';
import "./JobDetailsFeatureBox.scss"

interface JobDetailsFeatureBoxProps {
    featureText: string;
}

const JobDetailsFeatureBox: FC<JobDetailsFeatureBoxProps> = (props) => (
    <div className={"job-details-info-value"}>
        <span>{props.featureText}</span>
    </div>
);

export default JobDetailsFeatureBox;
