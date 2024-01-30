import React, {FC, useRef, useState} from 'react';
import './EmployerSetupComponent.scss';
import CompanyBuilding from "../../../../Components/icons/CompanyBuilding";
import CustomInputField from "../../../../Components/EditFormField/CustomInputField";
import CustomSelectField from "../../../../Components/CustomSelectField/CustomSelectField";
import {numberOfEmployees} from "../../../../AppConstData/NumberOfEmployees";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightLong} from "@fortawesome/free-solid-svg-icons";

interface EmployerSetupComponentProps {
}

const EmployerSetupComponent: FC<EmployerSetupComponentProps> = () => {
    const [companyName, setCompanyName] = useState("");
    const companyInputRef = useRef<HTMLInputElement>(null);
    const [numberOfEmployeesRange, setNumberOfEmployeesRange] = useState("");
    const [employerCredentials, setEmployerCredentials] = useState("");
    const credentialsInputRef = useRef<HTMLInputElement>(null);
    const [contactPhone, setContactPhone] = useState("");

    return (
        <div className={"employers-centralized-page-layout"}>
            <div className={"ems-title-with-img-fb"}>
                <div className={"ems-title-fb"}>
                    <span className={"dark-default-text ems-title"}>Create an employer account</span>
                </div>
                <div className={"ems-image-fb"}>
                    <CompanyBuilding/>
                </div>
            </div>
            <div className={"ems-content"}>
                <span className={"dark-default-text ems-sub-title"}>You haven't posted a job before, so you'll need to create an employer account.</span>
                <a className={"bold-navigation-link mt1rem"}>Not here to post a job</a>
                <div className="mt2rem"></div>
                <form className={"employers-side-form-fb"}>
                    <CustomInputField
                        fieldLabel={"Your company's name"}
                        isRequired={true}
                        inputFieldValue={companyName}
                        setInputFieldValue={setCompanyName}
                        inputRef={companyInputRef}
                    />
                    <CustomSelectField
                        fieldLabel={"Your company's number of employees"}
                        fieldValue={numberOfEmployeesRange}
                        setFieldValue={setNumberOfEmployeesRange}
                        optionsArr={numberOfEmployees}
                    />
                    <CustomInputField
                        fieldLabel={"Your first and last name"}
                        isRequired={true}
                        inputFieldValue={employerCredentials}
                        setInputFieldValue={setEmployerCredentials}
                    />
                    <CustomInputField
                        fieldLabel={"Your phone number"}
                        fieldSubtitle={"For account management communication. Not visible to job seekers.\n"}
                        isRequired={false}
                        inputFieldValue={contactPhone}
                        setInputFieldValue={setContactPhone}
                    />
                    <div className="mb2rem"></div>
                    <button className="blue-button br-corner-button">
                        <span>Continue</span>
                        <FontAwesomeIcon className={'svg1rem ml05rem'} icon={faArrowRightLong} />
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EmployerSetupComponent;
