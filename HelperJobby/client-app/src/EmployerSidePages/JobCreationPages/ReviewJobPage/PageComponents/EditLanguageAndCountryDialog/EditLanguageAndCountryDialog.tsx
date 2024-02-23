import React, {Dispatch, FC, SetStateAction, useRef, useState} from 'react';
import './EditLanguageAndCountryDialog.scss';
import useCurrentEmployerJob from "../../../../../hooks/useCurrentEmployerJob";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTriangleExclamation, faXmark} from "@fortawesome/free-solid-svg-icons";
import CustomSelectField from "../../../../../Components/CustomSelectField/CustomSelectField";
import {mostSpokenLanguages} from "../../../../../AppConstData/Languages";
import CountrySelector
    from "../../../../../JobSeekerSidePages/EditContactInfoPage/PageComponents/CountrySelector/CountrySelector";
import {logErrorInfo} from "../../../../../utils/logErrorInfo";
import {UpdatedIncompleteJobDTO} from "../../../../../DTOs/jobRelatetedDTOs/UpdatedIncompleteJobDTO";
import {IncompleteJobService} from "../../../../../services/incompleteJobService";
import WhiteLoadingSpinner from "../../../../../Components/WhiteLoadingSpinner/WhiteLoadingSpinner";
import {JobService} from "../../../../../services/jobService";
import {UpdatedJobDTO} from "../../../../../DTOs/jobRelatetedDTOs/UpdatedJobDTO";
import {JobCreationStates} from "../../../../../enums/utilityEnums/JobCreationStates";
import {JobDTO} from "../../../../../DTOs/jobRelatetedDTOs/JobDTO";
import {IncompleteJobDTO} from "../../../../../DTOs/jobRelatetedDTOs/IncompleteJobDTO";

interface EditLanguageAndCountryDialogProps {
    showDialog : boolean;
    setShowDialog : Dispatch<SetStateAction<boolean>>;
}

const EditLanguageAndCountryDialog: FC<EditLanguageAndCountryDialogProps> = ({
    showDialog,
    setShowDialog
                                                                             }) => {
    
    const [requestInProgress, setRequestInProgress] = useState(false);
    const {currentJob, setCurrentJob, jobCreationState} = useCurrentEmployerJob();
    const [language, setLanguage] = useState(currentJob?.language || "English");
    const [country, setCountry] = useState(currentJob?.locationCountry || "Canada");
    const [executeFormValidation, setExecuteFormValidation] = useState(false);
    const isInvalidLanguage = false;
    const countrySelectorRef = useRef<HTMLSelectElement>(null);
    const incompleteJobService = new IncompleteJobService();
    const jobService = new JobService();


    function closeDialog() {
        setShowDialog(false);
    }

    async function changeCurrentLanguageAndCountry() {
        if (!language){
            return;
        }
        if (!country){
            countrySelectorRef.current?.focus();
            return;
        }
        
        try {
            setRequestInProgress(true);
            if (jobCreationState == JobCreationStates.completeJob){
                const job =  currentJob as JobDTO;
                const updatedJob : UpdatedJobDTO = {
                    ...job,
                    language : language,
                    locationCountry : country
                }
                const retrievedJob = await jobService.putJob(currentJob!.id, updatedJob);
                setCurrentJob(retrievedJob);
            }
            else if (jobCreationState == JobCreationStates.incompleteJob){
                const job = currentJob as IncompleteJobDTO;
                const updatedJob : UpdatedIncompleteJobDTO = {
                    ...job,
                    language : language,
                    locationCountry : country
                }
                const retrievedJob = await incompleteJobService.updateJobCreation(currentJob!.id, updatedJob);
                setCurrentJob(retrievedJob);
            }
            
            closeDialog();
            
        }
        catch (err){
            logErrorInfo(err)
        }
        finally {
            setRequestInProgress(false);
        }
        
    }

    return !showDialog ? null :
        <div className={"dialog-window"}>
            <div className={"dialog-content-container job-post-dialog"}>
                <div className={"language-dialog-header"}>
                    <span>Edit language</span>
                    <button className={"small-interaction-button"} onClick={closeDialog}>
                        <FontAwesomeIcon className={"svg125rem"} icon={faXmark}/>
                    </button>
                </div>
                <div className={"dialog-separation-line"}></div>
                <div className={"dialog-main-content"}>
                    <CustomSelectField
                        fieldLabel={"Language of job post"}
                        fieldValue={language}
                        setFieldValue={setLanguage}
                        optionsArr={mostSpokenLanguages}
                        isRequired={true}
                        executeValidation={executeFormValidation}
                        setExecuteValidation={setExecuteFormValidation}
                        isInvalidSelect={isInvalidLanguage}
                    />
                    <CountrySelector
                        country={country}
                        setCountry={setCountry}
                        selectRef={countrySelectorRef}
                    />
                    <div className={"info-notify-container orange-notify-container"}>
                        <div className={"horizontal-title mb05rem"}>
                            <div className={"warning-pop-up-icon mr1rem"}>
                                <FontAwesomeIcon icon={faTriangleExclamation}/>
                            </div>
                            <div className={"semi-dark-small-text ai-center"}>
                                If you change the job's language or country now, you may need to enter additional
                                information before posting your job.
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"dialog-separation-line"}></div>
                <div className={"dialog-buttons"}>
                    <button
                        className={"light-button-with-margin"}
                        onClick={closeDialog}
                    >
                        Close
                    </button>
                    <button
                        className={`blue-button min-save-button-size`}
                        onClick={changeCurrentLanguageAndCountry}
                        disabled={requestInProgress}
                    >
                        {requestInProgress ? 
                            <WhiteLoadingSpinner/>
                            :
                            <>
                            <span>Done</span>
                            </>
                        }
                    </button>
                </div>
            </div>
            <div className={"background-overlay"} onClick={closeDialog}>

            </div>
        </div>
};

export default EditLanguageAndCountryDialog;
