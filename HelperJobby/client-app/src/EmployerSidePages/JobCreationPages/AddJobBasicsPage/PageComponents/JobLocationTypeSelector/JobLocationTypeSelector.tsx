import React, {Dispatch, FC, SetStateAction, useEffect, useRef, useState} from 'react';
import './JobLocationTypeSelector.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";
import useSelectWindowPosition from "../../../../../hooks/useSelectWindowPosition";
import {jobLocationTypesArr} from "../../../../../AppConstData/JobLocationTypesArr";
import {JobLocationType} from "../../../../../DTOs/locationDTO/JobLocationType";
import {JobLocationTypes} from "../../../../../enums/modelDataEnums/JobLocationTypes";

interface JobLocationTypeSelectorProps {
    jobLocationTypeEnumValue : JobLocationTypes;
    setJobLocationTypeEnumValue : Dispatch<SetStateAction<JobLocationTypes>>;
    includeWindowScroll : boolean;
}

const JobLocationTypeSelector: FC<JobLocationTypeSelectorProps> = ({
    jobLocationTypeEnumValue,
    setJobLocationTypeEnumValue,
    includeWindowScroll
                                                                   }) => {
    const [showOptions, setShowOptions] = useState(false);
    const selectWindowRef = useRef<HTMLDivElement>(null);
    const locationTypeButtonRef = useRef<HTMLButtonElement>(null);
    const getSelectWindowPosition = useSelectWindowPosition(locationTypeButtonRef, selectWindowRef, setShowOptions, includeWindowScroll);
    const [currentJobLocationType, setCurrentJobLocationType] =
        useState(jobLocationTypesArr.find(jlt => jlt.enumValue == jobLocationTypeEnumValue)?.type || "In person precise location");
    
    useEffect(() => {
        getSelectWindowPosition();
    }, [showOptions]);
    function handleLocationTypesClick() {
        setShowOptions(!showOptions);
    }

    
    function selectJobLocationTypeHandler(jobLocationType: JobLocationType) {
        setJobLocationTypeEnumValue(jobLocationType.enumValue);
        setCurrentJobLocationType(jobLocationType.type);
    }
    

    return (
        <>
            {showOptions && <div
                className={"select-window-container"}
                ref={selectWindowRef}
                style={{width : `${locationTypeButtonRef.current?.getBoundingClientRect().width}px`}}
            >
                {jobLocationTypesArr.map((jobLocationType, index) => (
                    <div
                        key={index}
                        className={"select-option"}
                        onClick={() => selectJobLocationTypeHandler(jobLocationType)}
                    >
                       
                            <div className={"mr075rem ml05rem"}>
                                <FontAwesomeIcon className={"svg075rem"}
                                                 style={{opacity : `${jobLocationTypeEnumValue === jobLocationType.enumValue ? "1" : "0"}`}}
                                                 icon={faCheck}/>
                            </div>
                        <span className={"multi-row-opt"}>
                                <span className="semi-dark-default-text unset-line-height mb025rem">
                                    {jobLocationType.type}
                                </span>
                                <span className="light-dark-svg">
                                    {jobLocationType.typeExplanations}
                                </span>
                            </span>
                    </div>
                ))}
            </div>}
            <div className={"edit-form-field"}>
                <div className={`field-label`}>
                    <span>Which option best describes this job's location?&nbsp;</span>
                    <span className={"error-text"}>*</span>

                </div>
                <div className={`field-input-container`}>
                    <div className={`border-lining`}/>
                    <button
                        className={"field-select field-select-button"}
                        type={"button"}
                        onClick={handleLocationTypesClick}
                        ref={locationTypeButtonRef}
                    >
                        <span>{currentJobLocationType}</span>
                        {showOptions ?
                            (<FontAwesomeIcon className={"svg1rem light-dark-svg"} icon={faChevronUp}/>)
                            :
                            (<FontAwesomeIcon className={"svg1rem light-dark-svg"} icon={faChevronDown}/>)
                        }
                    </button>
                </div>
                <div className={"input-field-spacing"}>
                </div>
            </div>
        </>
    )
}

export default JobLocationTypeSelector;
