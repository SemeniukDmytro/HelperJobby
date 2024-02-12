import React, {Dispatch, FC, SetStateAction, useEffect, useRef, useState} from 'react';
import './EditDescriptionDialog.scss';
import EditJobPostDialog from "../EditJobPostDialog/EditJobPostDialog";
import useJobCreation from "../../../../../hooks/useJobCreation";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleExclamation} from "@fortawesome/free-solid-svg-icons";
import {isValidDescription} from "../../../../../utils/validationLogic/isValidDescription";
import {logErrorInfo} from "../../../../../utils/logErrorInfo";
import {IncompleteJobService} from "../../../../../services/incompleteJobService";
import {UpdatedIncompleteJobDTO} from "../../../../../DTOs/jobRelatetedDTOs/UpdatedIncompleteJobDTO";

interface EditDescriptionDialogProps {
    showDialog: boolean;
    setShowDialog: Dispatch<SetStateAction<boolean>>;
}

const EditDescriptionDialog: FC<EditDescriptionDialogProps> = ({
                                                                   showDialog,
                                                                   setShowDialog
                                                               }) => {
    const {incompleteJob, setIncompleteJob} = useJobCreation();
    const [jobDescription, setJobDescription] = useState(incompleteJob?.description || "");
    const descriptionInputRef = useRef<HTMLInputElement>(null);
    const [isInvalidDescription, setIsInvalidDescription] = useState(false);
    const [descriptionError, setDescriptionError] = useState("");
    const [requestInProgress, setRequestInProgress] = useState(false);
    const incompleteJobService = new IncompleteJobService();

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
            setShowDialog(false);
        }
        catch (err){
            logErrorInfo(err);
        }
        finally {
            setRequestInProgress(false);   
        }
    }
    
    return (
        <EditJobPostDialog
            showDialog={showDialog}
            setShowDialog={setShowDialog}
            requestInProgress={requestInProgress}
            executeJobEditing={editJobDescription}>
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
        </EditJobPostDialog>
    )
}

export default EditDescriptionDialog;
