import React, {FC} from 'react';
import './JobFeature.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faPlus} from "@fortawesome/free-solid-svg-icons";

interface JobFeatureProps {
    featureName: string;
    isSelected: boolean;
    onClick: (jobType : string) => void;
}

const JobFeature: FC<JobFeatureProps> = ({
                                             featureName,
                                             isSelected,
                                             onClick
                                         }) => (
    <>
        <button className={`${isSelected ? "emps-job-feature-button-selected": "emps-job-feature-button"}`}
                onClick={() => onClick(featureName)}
                type={"button"}
        >
            {isSelected ?
                <FontAwesomeIcon className={"svg1rem mr05rem"} icon={faCheck}/>
                :
                <FontAwesomeIcon className={"svg1rem mr05rem"} icon={faPlus}/>
            }
            <span>{featureName}</span>
        </button>
    </>
);

export default JobFeature;
