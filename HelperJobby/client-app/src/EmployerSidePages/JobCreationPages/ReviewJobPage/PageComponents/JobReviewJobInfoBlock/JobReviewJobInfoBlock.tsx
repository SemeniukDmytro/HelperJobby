import React, {Dispatch, FC, SetStateAction, useEffect, useRef, useState} from 'react';
import './JobReviewJobInfoBlock.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faChevronUp, faCircleExclamation, faPen} from "@fortawesome/free-solid-svg-icons";
import JobDataNotProvidedNotifier from "../JobDataNotProvidedNotifier/JobDataNotProvidedNotifier";

interface JobReviewJobInfoBlockProps {
    jobInfoLabel: string;
    fieldValue: string;
    onEditClick: () => void;
    isFieldRequired: boolean;
}

const JobReviewJobInfoBlock: FC<JobReviewJobInfoBlockProps> = (
    {
        jobInfoLabel,
        fieldValue,
        onEditClick,
        isFieldRequired
    }) => {
    const fieldValueRef = useRef<HTMLDivElement>(null);
    const [showShowMoreButton, setShowMoreButton] = useState(isValueSizeIsTooBig());
    const [showMoreOptions, setShowMoreOptions] = useState(false);
    const [fieldValueContainerHeight, setFieldValueContainerHeight] = useState("3rem");
    const infoNotProvided = fieldValue.length === 0;

    useEffect(() => {
        setShowMoreButton(isValueSizeIsTooBig());
    }, [fieldValueRef.current]);

    function isValueSizeIsTooBig(): boolean {
        if (fieldValueRef.current?.getBoundingClientRect().height) {
            return fieldValueRef.current.getBoundingClientRect()?.height > 48;
        }
        return false;
    }

    function manageFieldValueHeight(event: React.MouseEvent) {
        event.stopPropagation();
        if (showMoreOptions) {
            setShowMoreOptions(false);
            setFieldValueContainerHeight("3rem");
        } else {
            setShowMoreOptions(true);
            setFieldValueContainerHeight(`${fieldValueRef.current?.getBoundingClientRect().height}px`);
        }
    }

    return (
        <div className={"jr-job-info-container"}>
            <div className={"field-label mt05rem"}>
                {jobInfoLabel}
            </div>
            <div>
                <a 
                    className={`ji-field-value-manage-block ${infoNotProvided ? (isFieldRequired ? "error-red-bc" : "add-blue-bc") : ""}`}
                    onClick={onEditClick}>
                    {fieldValue.length == 0 ?
                        <JobDataNotProvidedNotifier isRequired={isFieldRequired}/>
                        :
                        (<div className={"ji-value-info-layout"}>
                            <div
                                className={"ji-value-container semi-dark-default-text"}
                                style={{
                                    maxHeight: fieldValueContainerHeight
                                }}
                            >
                                <div
                                    ref={fieldValueRef}
                                >
                                    {fieldValue}
                                </div>
                            </div>
                            {showShowMoreButton &&
                                <div>
                                    <div className={"bold-navigation-link ji-show-full-value"}
                                         onClick={manageFieldValueHeight}>
                                        {showMoreOptions ?
                                            <>
                                                <span>Hide full {jobInfoLabel}</span>
                                                <FontAwesomeIcon className={"svg1rem ml05rem"} icon={faChevronUp}/>
                                            </>
                                            :
                                            <>
                                                <span>Show full {jobInfoLabel}</span>
                                                <FontAwesomeIcon className={"svg1rem ml05rem"} icon={faChevronDown}/>
                                            </>
                                        }
                                    </div>
                                </div>
                            }
                        </div>)}
                    <div className={"dark-blue-color ml05rem mt025rem"}>
                        <FontAwesomeIcon className={"svg1rem"} icon={faPen}/>
                    </div>
                </a>
            </div>
        </div>
    )
}

export default JobReviewJobInfoBlock;
