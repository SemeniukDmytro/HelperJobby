import React, {FC} from 'react';
import './JobDataNotProvidedNotifier.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleExclamation, faCirclePlus} from "@fortawesome/free-solid-svg-icons";

interface JobDataNotProvidedNotifierProps {
    isRequired: boolean
}

const JobDataNotProvidedNotifier: FC<JobDataNotProvidedNotifierProps> = ({
                                                                             isRequired
                                                                         }) => (
    (isRequired ?
            <span className={'error-text centralized-content'}>
                <FontAwesomeIcon className={`error-text mr025rem svg125rem`} icon={faCircleExclamation}/>
                <span className={"error-text"}>Required information is missing</span>
            </span>
            :
            <span className={"dark-blue-color centralized-content"}>
                <FontAwesomeIcon className={`svg125rem mr025rem`} icon={faCirclePlus}/>
                <span className={""}>Add optional information</span>
            </span>
    )
);

export default JobDataNotProvidedNotifier;
