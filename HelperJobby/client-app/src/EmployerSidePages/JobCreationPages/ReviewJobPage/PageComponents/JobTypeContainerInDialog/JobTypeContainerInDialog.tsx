import React, {Dispatch, FC, SetStateAction, useState} from 'react';
import './JobTypeContainerInDialog.scss';
import JobTypes from "../../../../../enums/modelDataEnums/JobTypes";
import {jobTypeStringToEnumMap} from "../../../../../utils/convertLogic/enumToStringConverter";
import {addJobType} from "../../../../../utils/manageJobFeatureSelect";

interface JobTypeContainerInDialogProps {
    selectedJobTypes: JobTypes[];
    setSelectedJobTypes: Dispatch<SetStateAction<JobTypes[]>>;
    jobTypeValue: string;
    setIsValidForm: Dispatch<SetStateAction<boolean>>
}

const JobTypeContainerInDialog: FC<JobTypeContainerInDialogProps> = ({
                                                                         selectedJobTypes,
                                                                         setSelectedJobTypes,
                                                                         jobTypeValue,
                                                                         setIsValidForm
                                                                     }) => {
    const [isSelected, setIsSelected] = useState(isJobTypeSelected);


    function isJobTypeSelected() {
        return selectedJobTypes?.includes(jobTypeStringToEnumMap(jobTypeValue)!)
    }

    function manageJobTypeClick() {
        addJobType(jobTypeValue, selectedJobTypes, setSelectedJobTypes, setIsValidForm);
        setIsSelected(!isSelected);
    }

    return (
        <div className={"jt-container-in-dialog"}>
            <button
                className={"light-button-with-margin jt-dialog-button"}
                type={"button"}
                onClick={manageJobTypeClick}
            >
                <div className={"checkbox-container mt0"}>
                    <input
                        className={"checkbox"}
                        type={"checkbox"}
                        checked={isSelected}
                        onChange={manageJobTypeClick}/>
                    <span>{jobTypeValue}</span>
                </div>
            </button>
        </div>
    )

}

export default JobTypeContainerInDialog;
