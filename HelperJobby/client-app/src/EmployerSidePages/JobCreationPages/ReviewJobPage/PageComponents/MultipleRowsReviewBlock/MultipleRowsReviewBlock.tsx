import React, {Dispatch, FC, ReactNode, SetStateAction, useEffect} from 'react';
import './MultipleRowsReviewBlock.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faChevronUp, faPen} from "@fortawesome/free-solid-svg-icons";
import JobDataNotProvidedNotifier from "../JobDataNotProvidedNotifier/JobDataNotProvidedNotifier";

interface MultipleRowsReviewBlockProps {
    fieldLabel: string;
    onEditClick: () => void;
    children: ReactNode;
    isFieldRequired: boolean;
    childCount: number;
}

const MultipleRowsReviewBlock: FC<MultipleRowsReviewBlockProps> = ({
                                                                       fieldLabel,
                                                                       onEditClick,
                                                                       children,
                                                                       isFieldRequired,
                                                                       childCount,
                                                                   }) => {
    const infoNotProvided = childCount === 0;

    return (
        <div className={"jr-job-info-container"}>
            <div className={"field-label mt05rem"}>
                {fieldLabel}
            </div>
            <div>
                <a className={`ji-field-value-manage-block
                    ${infoNotProvided ? (isFieldRequired ? "error-red-bc" : "add-blue-bc") : ""}`}
                   onClick={onEditClick}>
                    <div className={"ji-value-info-layout"}>
                        <div
                            className={"ji-value-container light-dark-default-text"}
                        >
                            <div>
                                {childCount == 0 ?
                                    <JobDataNotProvidedNotifier isRequired={isFieldRequired}/>
                                    :
                                    (children)
                                }
                            </div>
                        </div>
                    </div>
                    <div className={"dark-blue-color ml05rem mt025rem"} onClick={onEditClick}>
                        <FontAwesomeIcon className={"svg1rem"} icon={faPen}/>
                    </div>
                </a>
            </div>
        </div>
    )
};

export default MultipleRowsReviewBlock;
