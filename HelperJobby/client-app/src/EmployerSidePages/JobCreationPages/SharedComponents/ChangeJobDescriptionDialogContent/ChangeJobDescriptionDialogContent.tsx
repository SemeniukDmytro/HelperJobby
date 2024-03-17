import React, {Dispatch, FC, SetStateAction, useEffect, useRef, useState} from 'react';
import './ChangeJobDescriptionDialogContent.scss';
import {IncompleteJobService} from "../../../../services/incompleteJobService";
import {isValidDescription} from "../../../../utils/validationLogic/isValidDescription";
import {UpdatedIncompleteJobDTO} from "../../../../DTOs/jobRelatetedDTOs/UpdatedIncompleteJobDTO";
import {logErrorInfo} from "../../../../utils/logErrorInfo";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleExclamation} from "@fortawesome/free-solid-svg-icons";
import {JobService} from "../../../../services/jobService";
import {JobCreationStates} from "../../../../enums/utilityEnums/JobCreationStates";
import {JobDTO} from "../../../../DTOs/jobRelatetedDTOs/JobDTO";
import {UpdatedJobDTO} from "../../../../DTOs/jobRelatetedDTOs/UpdatedJobDTO";
import useCurrentEmployerJob from "../../../../hooks/contextHooks/useCurrentEmployerJob";
import DOMPurify from "dompurify";
import DescriptionInputWindow from "../../../../Components/DescriptionInputWindow/DescriptionInputWindow";

interface ChangeJobDescriptionDialogContentProps {
    showDialog : boolean;
    setShowDialog? : Dispatch<SetStateAction<boolean>>;
    setRequestInProgress : Dispatch<SetStateAction<boolean>>;
    setEditFunction : Dispatch<SetStateAction<() => void>>;
}

const ChangeJobDescriptionDialogContent: FC<ChangeJobDescriptionDialogContentProps> = ({
                                                                                           showDialog,
                                                                                           setRequestInProgress,
                                                                                           setEditFunction,
                                                                                           setShowDialog
                                                                                       }) => {
    const {currentJob, setCurrentJob, jobCreationState} = useCurrentEmployerJob();
    const [jobDescription, setJobDescription] = useState(currentJob?.description || "");
    const descriptionInputRef = useRef<HTMLInputElement>(null);
    const [isInvalidDescription, setIsInvalidDescription] = useState(false);
    const [descriptionError, setDescriptionError] = useState("");
    const incompleteJobService = new IncompleteJobService();
    const jobService = new JobService();

    useEffect(() => {
        setEditFunction(() => editJobDescription)
    }, [jobDescription]);
    
    useEffect(() => {
        if (descriptionInputRef.current && currentJob){
            const sanitizedDescription = DOMPurify.sanitize(currentJob.description || "", {
                ALLOWED_TAGS: ['b', 'i', 'br', 'p', 'ul', 'ol', 'li', 'strong', 'em', 'blockquote'],
            });
            descriptionInputRef.current.innerHTML = sanitizedDescription;
            setJobDescription(sanitizedDescription);
        }
    }, [showDialog]);


    async function editJobDescription(){
        if (!isValidDescription(jobDescription, setDescriptionError, setIsInvalidDescription)){
            descriptionInputRef.current?.focus();
            return;

        }
        try {
            setRequestInProgress(true);
            if (jobCreationState == JobCreationStates.incompleteJob){
                const updatedIncompleteJob : UpdatedIncompleteJobDTO = {
                    ...currentJob,
                    description : jobDescription
                }
                const retrievedIncompleteJob = await incompleteJobService.updateJobCreation(currentJob!.id, updatedIncompleteJob);
                setCurrentJob(retrievedIncompleteJob);
            }
            else {
                const job = currentJob as JobDTO;
                const updatedJob: UpdatedJobDTO = {
                    ...job,
                    description : jobDescription
                };
                const retrievedJob = await jobService.putJob(currentJob!.id, updatedJob);
                setCurrentJob(retrievedJob);
            }
            setShowDialog && setShowDialog(false);
        }
        catch (err){
            logErrorInfo(err);
        }
        finally {
            setRequestInProgress(false);
        }
    }
    return (
        <>
            <div className={"description-container"}>
                <DescriptionInputWindow
                    jobDescription={jobDescription}
                    setJobDescription={setJobDescription}
                    descriptionInputRef={descriptionInputRef}
                    descriptionError={descriptionError}
                    setDescriptionError={setDescriptionError}
                    isInvalidDescription={isInvalidDescription}
                    setIsInvalidDescription={setIsInvalidDescription}
                />    
            </div>
        </>
    )
}

export default ChangeJobDescriptionDialogContent;
