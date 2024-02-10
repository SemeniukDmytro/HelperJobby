import React, {FC, ReactNode} from 'react';
import './MultipleRowsReviewBlock.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faChevronUp, faPen} from "@fortawesome/free-solid-svg-icons";

interface MultipleRowsReviewBlockProps {
    fieldLabel: string;
    onEditClick: () => void;
    children: ReactNode;
}

const MultipleRowsReviewBlock: FC<MultipleRowsReviewBlockProps> = ({fieldLabel, onEditClick, children}) => {
    
    return(
        <div className={"jr-job-info-container"}>
            <div className={"field-label mt05rem"}>
                {fieldLabel}
            </div>
            <div>
                <a className={"ji-field-value-manage-block"}>
                    <div className={"ji-value-info-layout"}>
                        <div
                            className={"ji-value-container semi-dark-default-text"}
                        >
                            <div
                            >
                                {children}
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
