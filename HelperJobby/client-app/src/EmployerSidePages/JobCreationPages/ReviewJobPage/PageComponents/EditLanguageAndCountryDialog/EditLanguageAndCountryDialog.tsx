import React, {Dispatch, FC, SetStateAction, useRef, useState} from 'react';
import './EditLanguageAndCountryDialog.scss';
import SelectLanguageDialog from "../../../AddJobBasicsPage/PageComponents/SelectLanguageDialog/SelectLanguageDialog";
import useJobCreation from "../../../../../hooks/useJobCreation";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import CustomSelectField from "../../../../../Components/CustomSelectField/CustomSelectField";
import {mostSpokenLanguages} from "../../../../../AppConstData/Languages";
import CountrySelector
    from "../../../../../JobSeekerSidePages/EditContactInfoPage/PageComponents/CountrySelector/CountrySelector";
import {logErrorInfo} from "../../../../../utils/logErrorInfo";
import {UpdatedIncompleteJobDTO} from "../../../../../DTOs/jobRelatetedDTOs/UpdatedIncompleteJobDTO";
import {IncompleteJobService} from "../../../../../services/incompleteJobService";
import WhiteLoadingSpinner from "../../../../../Components/WhiteLoadingSpinner/WhiteLoadingSpinner";

interface EditLanguageAndCountryDialogProps {
    showDialog : boolean;
    setShowDialog : Dispatch<SetStateAction<boolean>>;
}

const EditLanguageAndCountryDialog: FC<EditLanguageAndCountryDialogProps> = ({
    showDialog,
    setShowDialog
                                                                             }) => {
    
    const {incompleteJob, setIncompleteJob} = useJobCreation();
    const [language, setLanguage] = useState(incompleteJob?.language || "English");
    const [country, setCountry] = useState(incompleteJob?.locationCountry || "Canada");
    const [executeFormValidation, setExecuteFormValidation] = useState(false);
    const [requestInProgress, setRequestInProgress] = useState(false);
    const isInvalidLanguage = false;
    const countrySelectorRef = useRef<HTMLSelectElement>(null);
    const incompleteJobService = new IncompleteJobService();


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
            const updatedJob : UpdatedIncompleteJobDTO = {
                ...incompleteJob,
                language : language,
                locationCountry : country
            }
            const retrievedJob = await incompleteJobService.updateJobCreation(incompleteJob!.id, updatedJob);
            setIncompleteJob(retrievedJob);
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
            <div className={"dialog-content-container"}>
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
                        className={`blue-button`}
                        onClick={changeCurrentLanguageAndCountry}
                    >
                        {requestInProgress ? <WhiteLoadingSpinner/>
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
