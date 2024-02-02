import React, {Dispatch, FC, SetStateAction, useRef, useState} from 'react';
import './SelectLanguageDialog.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import CustomSelectField from "../../../../../Components/CustomSelectField/CustomSelectField";
import {mostSpokenLanguages} from "../../../../../AppConstData/Languages";
import CountrySelector
    from "../../../../../JobSeekerSidePages/EditContactInfoPage/PageComponents/CountrySelector/CountrySelector";

interface SelectLanguageDialogProps {
    showDialog: boolean;
    setShowDialog: Dispatch<SetStateAction<boolean>>;
    currentLanguage: string;
    setCurrentLanguage: Dispatch<SetStateAction<string>>;
    currentCountry : string;
    setCurrentCountry : Dispatch<SetStateAction<string>>;
}

const SelectLanguageDialog: FC<SelectLanguageDialogProps> = ({
    showDialog,
    setShowDialog,
    currentLanguage,
    setCurrentLanguage,
    currentCountry,
    setCurrentCountry
                                                             }) => {
    const [language, setLanguage] = useState(currentLanguage);
    const [country, setCountry] = useState(currentCountry);
    const [validateData, setValidateData] = useState(false);
    const isInvalidLanguage = false;
    const countrySelectorRef = useRef<HTMLSelectElement>(null);


    function closeDialog() {
        setShowDialog(false);
    }
    
    function changeCurrentLanguage(){
        setValidateData(true);
        if (isInvalidLanguage){
            return;
        }
        setCurrentCountry(country);
        setCurrentLanguage(language);
        closeDialog();
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
                <div className={"dialog-main-text"}>
                    <CustomSelectField
                        fieldLabel={"Language of job post"}
                        fieldValue={language}
                        setFieldValue={setLanguage}
                        optionsArr={mostSpokenLanguages}
                        isRequired={true}
                        executeValidation={validateData}
                        setExecuteValidation={setValidateData}
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
                        onClick={changeCurrentLanguage}
                    >
                        Done
                    </button>
                </div>
            </div>
            <div className={"background-overlay"} onClick={closeDialog}>

            </div>
        </div>
}

export default SelectLanguageDialog;
