import React, {Dispatch, FC, SetStateAction, useEffect, useRef, useState} from 'react';
import './ChangeJobDescriptionDialogContent.scss';
import useJobCreation from "../../../../hooks/useJobCreation";
import {IncompleteJobService} from "../../../../services/incompleteJobService";
import {isValidDescription} from "../../../../utils/validationLogic/isValidDescription";
import {UpdatedIncompleteJobDTO} from "../../../../DTOs/jobRelatetedDTOs/UpdatedIncompleteJobDTO";
import {logErrorInfo} from "../../../../utils/logErrorInfo";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleExclamation} from "@fortawesome/free-solid-svg-icons";

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
    const {incompleteJob, setIncompleteJob} = useJobCreation();
    const [jobDescription, setJobDescription] = useState(incompleteJob?.description || "");
    const descriptionInputRef = useRef<HTMLInputElement>(null);
    const [isInvalidDescription, setIsInvalidDescription] = useState(false);
    const [descriptionError, setDescriptionError] = useState("");
    const incompleteJobService = new IncompleteJobService();

    useEffect(() => {
        setEditFunction(() => editJobDescription)
    }, [jobDescription]);
    
    useEffect(() => {
        if (descriptionInputRef.current && incompleteJob){
            descriptionInputRef.current.innerText = incompleteJob.description || "";
            setJobDescription(incompleteJob.description || "");
        }
    }, [showDialog]);

    function changeDescriptionValue(event: React.FormEvent<HTMLDivElement>) {
        isValidDescription(event.currentTarget.innerHTML, setDescriptionError, setIsInvalidDescription);
        setJobDescription(event.currentTarget.innerHTML);
    }


    async function editJobDescription(){
        if (!isValidDescription(jobDescription, setDescriptionError, setIsInvalidDescription)){
            descriptionInputRef.current?.focus();
            return;

        }
        try {
            setRequestInProgress(true);
            const updatedIncompleteJob : UpdatedIncompleteJobDTO = {
                ...incompleteJob,
                description : jobDescription
            }
            const retrievedIncompleteJob = await incompleteJobService.updateJobCreation(incompleteJob!.id, updatedIncompleteJob);
            setIncompleteJob(retrievedIncompleteJob);
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
                <div
                    className={`small-title horizontal-title ${isInvalidDescription ? "error-text" : ""}`}
                    style={{marginBottom: "0.25rem"}}
                >
                    <span>Job description</span>
                    <span className={"error-text"}>&nbsp;*</span>
                </div>
                <div style={{position: "relative", marginTop: "0.5rem"}}>
                    <div
                        role={"textbox"}
                        contentEditable={true}
                        ref={descriptionInputRef}
                        className={`description-input ${isInvalidDescription ? "red-field-focus" : ""}`}
                        onInput={changeDescriptionValue}
                        onBlur={() => isValidDescription(jobDescription, setDescriptionError, setIsInvalidDescription)}
                    >
                    </div>
                    <div className={`description-focused ${isInvalidDescription ? "red-field-focus" : ""}`}></div>
                </div>
                <div className={"mt15rem mb1rem"}>
                    <a className={"bold-navigation-link"}>Upload a PDF or DOCX</a>
                </div>
                {isInvalidDescription &&
                    <div className={"error-box"}>
                        <FontAwesomeIcon className={`error-text error-svg`} icon={faCircleExclamation}/>
                        <span className={"error-text"}>{descriptionError}</span>
                    </div>
                }
            </div>
        </>
    )
}

export default ChangeJobDescriptionDialogContent;
