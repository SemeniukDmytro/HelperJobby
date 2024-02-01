import React, {FC} from 'react';
import './SettingsFieldtToChange.scss';
import {useNavigate} from "react-router-dom";

interface SettingsChangeFieldProps {
    fieldLabel: string;
    fieldValue: string;
    fieldButtonText: string;
    changeFieldPagePath: string;
}

const SettingsFieldtToChange: FC<SettingsChangeFieldProps> = ({
                                                               fieldLabel,
                                                               fieldValue,
                                                               fieldButtonText,
                                                               changeFieldPagePath
                                                           }) => {
    const navigate = useNavigate();

    function navigateToChangeAccountInfoPage() {
        navigate(changeFieldPagePath)
    }

    return (
        <>
            <div className={"content-separation-margin"}></div>
            <div className={"settings-field-layout"}>
                <div className={"info-container"}>
                    <div className={"field-label"}>
                        <span>{fieldLabel}</span>
                    </div>
                    <div className={"semi-dark-default-text"}>
                        <span>{fieldValue}</span>
                    </div>
                </div>
                <button
                    className={"light-button-with-margin button-without-margin"}
                    onClick={navigateToChangeAccountInfoPage}
                >
                    {fieldButtonText}
                </button>
            </div>
            <div className={"content-separation-line"}></div>
        </>
    )
}

export default SettingsFieldtToChange;
