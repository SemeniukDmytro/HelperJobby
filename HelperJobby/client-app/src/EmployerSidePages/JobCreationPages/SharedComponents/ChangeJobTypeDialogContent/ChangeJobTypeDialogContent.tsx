import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import './ChangeJobTypeDialogContent.scss';
import useCurrentEmployerJob from "../../../../hooks/useCurrentEmployerJob";
import {IncompleteJobService} from "../../../../services/incompleteJobService";
import {UpdatedIncompleteJobDTO} from "../../../../DTOs/jobRelatetedDTOs/UpdatedIncompleteJobDTO";
import {logErrorInfo} from "../../../../utils/logErrorInfo";
import {jobTypesStringValues} from "../../../../AppConstData/JobEnumsToStringsArrays";
import JobTypeContainerInDialog
    from "../../ReviewJobPage/PageComponents/JobTypeContainerInDialog/JobTypeContainerInDialog";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleExclamation} from "@fortawesome/free-solid-svg-icons";
import {JobService} from "../../../../services/jobService";
import {JobCreationStates} from "../../../../enums/utilityEnums/JobCreationStates";
import {JobDTO} from "../../../../DTOs/jobRelatetedDTOs/JobDTO";
import {UpdatedJobDTO} from "../../../../DTOs/jobRelatetedDTOs/UpdatedJobDTO";
import {IncompleteJobDTO} from "../../../../DTOs/jobRelatetedDTOs/IncompleteJobDTO";

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
    const {currentJob, setCurrentJob, jobCreationState} = useCurrentEmployerJob();
    const [selectedJobTypes, setSelectedJobTypes] = useState(currentJob?.jobType || []);
    const [isInvalidForm, setIsInvalidForm] = useState(selectedJobTypes.length > 0);
    const incompleteJobService = new IncompleteJobService();
    const jobService = new JobService();

    useEffect(() => {
        if (showDialog) {
            setSelectedJobTypes(currentJob?.jobType || []);
            if (currentJob?.jobType && currentJob.jobType.length > 0) {
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
            if (jobCreationState == JobCreationStates.incompleteJob){
                const job = currentJob as IncompleteJobDTO;
                const updatedIncompleteJobDTO: UpdatedIncompleteJobDTO = {
                    ...job,
                    jobType: selectedJobTypes
                }
                const retrievedJob = await incompleteJobService.updateJobCreation(currentJob!.id, updatedIncompleteJobDTO);
                setCurrentJob(retrievedJob);
            }
            else {
                const job = currentJob as JobDTO;
                const updatedJob: UpdatedJobDTO = {
                    ...job,
                    jobType : selectedJobTypes
                };
                const retrievedJob = await jobService.putJob(currentJob!.id, updatedJob);
                setCurrentJob(retrievedJob);
            }
            
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
