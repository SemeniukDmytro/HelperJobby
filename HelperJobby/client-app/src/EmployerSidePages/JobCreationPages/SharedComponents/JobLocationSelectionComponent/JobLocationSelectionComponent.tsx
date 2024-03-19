import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import './JobLocationSelectionComponent.scss';
import JobLocationTypeSelector
    from "../../AddJobBasicsPage/PageComponents/JobLocationTypeSelector/JobLocationTypeSelector";
import {JobLocationTypes} from "../../../../enums/modelDataEnums/JobLocationTypes";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleInfo} from "@fortawesome/free-solid-svg-icons";
import LocationCustomInputField from "../../../../Components/LocationCustomInputField/LocationCustomInputField";
import {useJobLocationType} from "../../../../hooks/comnonentSharedHooks/useJobLocationType";

interface JobLocationSelectionComponentProps {
    jobLocationTypeEnumValue: JobLocationTypes;
    setJobLocationTypeEnumValue: Dispatch<SetStateAction<JobLocationTypes>>;
    locationInputRef: React.RefObject<HTMLInputElement>;
    inPersonJobLocation: string;
    setInPersonJobLocation: Dispatch<SetStateAction<string>>;
    generalJobLocation: string;
    setGeneralJobLocation: Dispatch<SetStateAction<string>>;
    remoteJobLocation: string;
    setRemoteJobLocation: Dispatch<SetStateAction<string>>;
    onRoadJobLocation: string;
    setOnRoadJobLocation: Dispatch<SetStateAction<string>>;
    setShowStreetsAutocomplete: Dispatch<SetStateAction<boolean>>;
    setShowCitiesAutocomplete: Dispatch<SetStateAction<boolean>>;
    executeFormValidation: boolean;
    setExecuteFormValidation: Dispatch<SetStateAction<boolean>>;
    locationSelectedFromSuggests: boolean;
    setLocationSelectedFromSuggests: Dispatch<SetStateAction<boolean>>;
    locationError: string;
    setLocationError: Dispatch<SetStateAction<string>>;
    includeWindowScroll: boolean;
}

const JobLocationSelectionComponent: FC<JobLocationSelectionComponentProps> = ({
                                                                                   jobLocationTypeEnumValue,
                                                                                   setJobLocationTypeEnumValue,
                                                                                   locationInputRef,
                                                                                   inPersonJobLocation,
                                                                                   setInPersonJobLocation,
                                                                                   generalJobLocation,
                                                                                   setGeneralJobLocation,
                                                                                   remoteJobLocation,
                                                                                   setRemoteJobLocation,
                                                                                   onRoadJobLocation,
                                                                                   setOnRoadJobLocation,
                                                                                   setShowStreetsAutocomplete,
                                                                                   setShowCitiesAutocomplete,
                                                                                   locationSelectedFromSuggests,
                                                                                   setLocationSelectedFromSuggests,
                                                                                   locationError,
                                                                                   setLocationError,
                                                                                   executeFormValidation,
                                                                                   setExecuteFormValidation,
                                                                                   includeWindowScroll

                                                                               }) => {
    const [jobLocationFieldLabel, setJobLocationFieldLabel] =
        useState("What is the street address for this location?");
    const {getCurrentJobLocationInputProp} = useJobLocationType(inPersonJobLocation, setInPersonJobLocation,
        generalJobLocation, setGeneralJobLocation,
        remoteJobLocation, setRemoteJobLocation,
        onRoadJobLocation, setOnRoadJobLocation);

    useEffect(() => {
        handleJobLocationTypeChange()
    }, [jobLocationTypeEnumValue]);

    function handleJobLocationTypeChange() {
        switch (jobLocationTypeEnumValue) {
            case JobLocationTypes.InPerson:
                setJobLocationFieldLabel("What is the street address for this location?")
                return;
            case JobLocationTypes.GeneralLocation:
                setJobLocationFieldLabel("What is the job location?")
                return;
            case JobLocationTypes.Remote:
                setJobLocationFieldLabel("Your job location will appear as Remote, and we’ll advertise it to people searching for remote work nationwide.")
                setRemoteJobLocation("Remote");
                return;
            case JobLocationTypes.OnRoad:
                setJobLocationFieldLabel("What is the operating area for this job?")
                return;
        }
    }

    return (
        <>
            <JobLocationTypeSelector
                jobLocationTypeEnumValue={jobLocationTypeEnumValue}
                setJobLocationTypeEnumValue={setJobLocationTypeEnumValue}
                includeWindowScroll={includeWindowScroll}
            />
            {jobLocationTypeEnumValue === JobLocationTypes.Remote ?
                <div className={"info-notify-container blue-notify-container mb15rem"}>
                    <FontAwesomeIcon className={"svg1rem dark-blue-color mr1rem"} icon={faCircleInfo}/>
                    <span className={"semi-dark-small-text"}>{jobLocationFieldLabel}</span>
                </div>
                :
                (jobLocationTypeEnumValue === JobLocationTypes.InPerson ?
                        <LocationCustomInputField
                            fieldLabel={jobLocationFieldLabel}
                            inputValue={inPersonJobLocation}
                            setInputValue={setInPersonJobLocation}
                            inputRef={locationInputRef}
                            isRequired={true}
                            setShowAutocompleteResults={setShowStreetsAutocomplete}
                            selectedFromSuggests={locationSelectedFromSuggests}
                            setSelectedFromSuggests={setLocationSelectedFromSuggests}
                            executeValidation={executeFormValidation}
                            setExecuteValidation={setExecuteFormValidation}
                            customErrorMessage={locationError}
                            setCustomErrorMessage={setLocationError}
                            locationMaxLength={100}
                        />

                        :
                        <LocationCustomInputField
                            fieldLabel={jobLocationFieldLabel}
                            inputValue={getCurrentJobLocationInputProp(jobLocationTypeEnumValue).inputValue}
                            setInputValue={getCurrentJobLocationInputProp(jobLocationTypeEnumValue).setInputValue}
                            inputRef={locationInputRef}
                            isRequired={true}
                            setShowAutocompleteResults={setShowCitiesAutocomplete}
                            selectedFromSuggests={locationSelectedFromSuggests}
                            setSelectedFromSuggests={setLocationSelectedFromSuggests}
                            executeValidation={executeFormValidation}
                            setExecuteValidation={setExecuteFormValidation}
                            customErrorMessage={locationError}
                            setCustomErrorMessage={setLocationError}
                            locationMaxLength={100}
                        />
                )
            }</>
    )
}

export default JobLocationSelectionComponent;
