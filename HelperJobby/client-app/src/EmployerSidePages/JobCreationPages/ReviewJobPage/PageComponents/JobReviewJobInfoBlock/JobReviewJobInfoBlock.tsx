import React, {FC, useEffect, useRef, useState} from 'react';
import './JobReviewJobInfoBlock.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faChevronUp, faPen} from "@fortawesome/free-solid-svg-icons";

interface JobReviewJobInfoBlockProps {
    jobInfoLabel: string;
    fieldValue: string;
    onEditClick: () => void;
}

const JobReviewJobInfoBlock: FC<JobReviewJobInfoBlockProps> = (
    {
        jobInfoLabel,
        fieldValue,
        onEditClick
    }) => {
    const fieldValueRef = useRef<HTMLDivElement>(null);
    const [showShowMoreButton, setShowMoreButton] = useState(isValueSizeIsTooBig());
    const [showMoreOptions, setShowMoreOptions] = useState(false);
    const [fieldValueContainerHeight, setFieldValueContainerHeight] = useState("3rem");

    useEffect(() => {
        setShowMoreButton(isValueSizeIsTooBig());
    }, [fieldValueRef.current]);
    function isValueSizeIsTooBig() : boolean{
        if (fieldValueRef.current?.getBoundingClientRect().height){
            return fieldValueRef.current.getBoundingClientRect()?.height > 48;
        }
        return false
    }

    function manageFieldValueHeight() {
        if (showMoreOptions){
            setShowMoreOptions(false);
            setFieldValueContainerHeight("3rem");
        }
        else {
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
                <a className={"ji-field-value-manage-block"} onClick={onEditClick}>
                    <div className={"ji-value-info-layout"}>
                        <div 
                            className={"ji-value-container semi-dark-default-text"}
                            style={{
                                maxHeight : fieldValueContainerHeight
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
                                <div className={"bold-navigation-link ji-show-full-value"} onClick={manageFieldValueHeight}>
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
                    </div>
                    <div className={"dark-blue-color ml05rem mt025rem"}>
                        <FontAwesomeIcon className={"svg1rem"} icon={faPen}/>
                    </div>
                </a>
            </div>
        </div>
    )
}

export default JobReviewJobInfoBlock;
