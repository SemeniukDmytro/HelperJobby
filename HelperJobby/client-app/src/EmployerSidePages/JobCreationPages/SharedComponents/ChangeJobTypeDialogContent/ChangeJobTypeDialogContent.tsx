import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import './ChangeJobTypeDialogContent.scss';
import useJobCreation from "../../../../hooks/useJobCreation";
import {IncompleteJobService} from "../../../../services/incompleteJobService";
import {UpdatedIncompleteJobDTO} from "../../../../DTOs/jobRelatetedDTOs/UpdatedIncompleteJobDTO";
import {logErrorInfo} from "../../../../utils/logErrorInfo";
import {jobTypesStringValues} from "../../../../AppConstData/JobEnumsToStringsArrays";
import JobTypeContainerInDialog
    from "../../ReviewJobPage/PageComponents/JobTypeContainerInDialog/JobTypeContainerInDialog";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleExclamation} from "@fortawesome/free-solid-svg-icons";

interface ChangeJobTypeDialogContentProps {
    showDialog: boolean;
    setShowDialog?: Dispatch<SetStateAction<boolean>>;
    setRequestInProgress: Dispatch<SetStateAction<boolean>>;
    setEditFunction: Dispatch<SetStateAction<() => void>>;
}

const ChangeJobTypeDialogContent: FC<ChangeJobTypeDialogContentProps> = ({
                                                                             showDialog,
                                                                             setRequestInProgress,
                                                                             setEditFunction,
                                                                             setShowDialog
                                                                         }) => {
    const {incompleteJob, setIncompleteJob} = useJobCreation();
    const [selectedJobTypes, setSelectedJobTypes] = useState(incompleteJob?.jobType || []);
    const [isInvalidForm, setIsInvalidForm] = useState(selectedJobTypes.length > 0);
    const incompleteJobService = new IncompleteJobService();

    useEffect(() => {
        if (showDialog) {
            setSelectedJobTypes(incompleteJob?.jobType || []);
            if (incompleteJob?.jobType && incompleteJob.jobType.length > 0) {
                setIsInvalidForm(false);
            }
        }
    }, [showDialog]);

    useEffect(() => {
        setEditFunction(() => editJobType)
    }, [selectedJobTypes]);

    async function editJobType() {
        if (selectedJobTypes.length === 0) {
            setIsInvalidForm(true);
            return;
        }
        try {
            setRequestInProgress(true);
            const updatedIncompleteJobDTO: UpdatedIncompleteJobDTO = {
                ...incompleteJob,
                jobType: selectedJobTypes
            }
            const retrievedJob = await incompleteJobService.updateJobCreation(incompleteJob!.id, updatedIncompleteJobDTO);
            setIncompleteJob(retrievedJob);
            setShowDialog && setShowDialog(false);
        } catch (err) {
            logErrorInfo(err)
        } finally {
            setRequestInProgress(false);
        }
    }

    return (
        <>
            <div className={"mb025rem"}>
                <span className={`field-label ${isInvalidForm ? "error-text" : ""}`}>What type of job is it?</span>
                <span className={"error-text"}>&nbsp;*</span>
            </div>
            <div className={'ejtd-job-types-fb'}>
                {jobTypesStringValues.map((jtString, index) => (
                    <JobTypeContainerInDialog selectedJobTypes={selectedJobTypes}
                                              setSelectedJobTypes={setSelectedJobTypes}
                                              jobTypeValue={jtString}
                                              setIsValidForm={setIsInvalidForm}
                                              key={index}
                    />
                ))}
            </div>
            {isInvalidForm &&
                <div className={"error-box"}>
                    <FontAwesomeIcon className={`error-text error-svg`} icon={faCircleExclamation}/>
                    <span className={"error-text"}>Make a selection</span>
                </div>
            }
        </>
    )

}

export default ChangeJobTypeDialogContent;
