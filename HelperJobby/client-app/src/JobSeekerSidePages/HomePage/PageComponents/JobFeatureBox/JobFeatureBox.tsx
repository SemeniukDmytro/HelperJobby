import React, {FC} from 'react';
import "./JobFeatureBox.scss";

interface JobFeatureBoxProps {
    featureName: string;
    moreFeaturesAmount: number;
}

const JobFeatureBox: FC<JobFeatureBoxProps> = (props) => (
    <div className={"job-feature"}>
        <span>{props.featureName}</span>
        {props.moreFeaturesAmount > 0 &&
            <span className={"more-features-identifier"}>+{props.moreFeaturesAmount}</span>}
    </div>
);

export default JobFeatureBox;
