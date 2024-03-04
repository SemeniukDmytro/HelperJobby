import React, {Dispatch, FC, SetStateAction, useEffect, useRef, useState} from 'react';
import './ChangeJobLocationDialogContent.scss';
import AutocompleteResultsWindow
    from "../../../../JobSeekerSidePages/EditContactInfoPage/PageComponents/AutocompleteResultsWindow/AutocompleteResultsWindow";
import {AutocompleteWindowTypes} from "../../../../enums/utilityEnums/AutocompleteWindowTypes";
import JobLocationSelectionComponent from "../JobLocationSelectionComponent/JobLocationSelectionComponent";
import {IncompleteJobService} from "../../../../services/incompleteJobService";
import {UpdatedIncompleteJobDTO} from "../../../../DTOs/jobRelatetedDTOs/UpdatedIncompleteJobDTO";
import {logErrorInfo} from "../../../../utils/logErrorInfo";
import {JobCreationStates} from "../../../../enums/utilityEnums/JobCreationStates";
import {JobDTO} from "../../../../DTOs/jobRelatetedDTOs/JobDTO";
import {UpdatedJobDTO} from "../../../../DTOs/jobRelatetedDTOs/UpdatedJobDTO";
import {JobService} from "../../../../services/jobService";
import useCurrentEmployerJob from "../../../../hooks/contextHooks/useCurrentEmployerJob";
import {JobLocationTypes} from "../../../../enums/modelDataEnums/JobLocationTypes";
import {useJobLocationType} from "../../../../hooks/comnonentSharedHooks/useJobLocationType";

interface ChangeJobLocationDialogContentProps {
    showDialog: boolean;
    setShowDialog?: Dispatch<SetStateAction<boolean>>;
    setRequestInProgress: Dispatch<SetStateAction<boolean>>;
    setEditFunction: Dispatch<SetStateAction<() => void>>;
}

const ChangeJobLocationDialogContent: FC<ChangeJobLocationDialogContentProps> = ({
                                                                                     showDialog,
                                                                                     setRequestInProgress,
                                                                                     setEditFunction,
                                                                                     setShowDialog
                                                                                 }) => {
    const {currentJob, setCurrentJob, jobCreationState} = useCurrentEmployerJob();
    const [jobLocationType, setJobLocationType] = useState(currentJob?.jobLocationType || JobLocationTypes.InPerson);
    const [inPersonJobLocation, setInPersonJobLocation] = useState("");
    const [generalJobLocation, setGeneralJobLocation] = useState("");
    const [remoteJobLocation, setRemoteJobLocation] = useState("");
    const [onRoadJobLocation, setOnRoadJobLocation] = useState("");
    const locationInputRef = useRef<HTMLInputElement>(null);
    const [executeFormValidation, setExecuteFormValidation] = useState(false);
    const [showStreetsAutocomplete, setShowStreetsAutocomplete] = useState(false);
    const [showCityAutoComplete, setShowCitiesAutoComplete] = useState(false);
    const [locationSelectedFromSuggests, setLocationSelectedFromSuggests] = useState(false);
    const [locationError, setLocationError] = useState("");
    const {getCurrentJobLocationInputProp} = useJobLocationType(inPersonJobLocation, setInPersonJobLocation,
        generalJobLocation, setGeneralJobLocation,
        remoteJobLocation, setRemoteJobLocation,
        onRoadJobLocation, setOnRoadJobLocation);
    const incompleteJobService = new IncompleteJobService();
    const jobService = new JobService();
    
    useEffect(() => {
        if (showDialog){
            if (currentJob?.location){
                setLocationSelectedFromSuggests(true);
                getCurrentJobLocationInputProp(jobLocationType).setInputValue(currentJob?.location || "");
            }
        }

    }, [showDialog]);

    useEffect(() => {
        setEditFunction(() => editLocation)
    }, [inPersonJobLocation, generalJobLocation, remoteJobLocation, onRoadJobLocation]);

    async function editLocation() {
        if (!getCurrentJobLocationInputProp(jobLocationType).inputValue) {
            setLocationError("Add an address")
            return;
        }
        if (!locationSelectedFromSuggests) {
            setLocationError("We don't recognize this address. Please select address from suggestions window")
            return;
        }
        try {
            setRequestInProgress(true);
            if (jobCreationState == JobCreationStates.incompleteJob){
                const updatedIncompleteJob : UpdatedIncompleteJobDTO = {
                    ...currentJob,
                    jobLocationType : jobLocationType,
                    location : getCurrentJobLocationInputProp(jobLocationType).inputValue
                }
                const retrievedIncompleteJob = await incompleteJobService.updateJobCreation(currentJob!.id, updatedIncompleteJob);
                setCurrentJob(retrievedIncompleteJob);
            }
            else {
                const job = currentJob as JobDTO;
                const updatedJob: UpdatedJobDTO = {
                    ...job,
                    jobLocationType : jobLocationType,
                    location : getCurrentJobLocationInputProp(jobLocationType).inputValue
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
            {showStreetsAutocomplete && <AutocompleteResultsWindow
                inputFieldRef={locationInputRef}
                windowMaxWidth={"702px"}
                inputValue={getCurrentJobLocationInputProp(jobLocationType).inputValue}
                setInputValue={getCurrentJobLocationInputProp(jobLocationType).setInputValue}
                country={currentJob?.locationCountry || ""}
                showResult={showStreetsAutocomplete}
                setShowResult={setShowStreetsAutocomplete}
                autocompleteWindowType={AutocompleteWindowTypes.streetAddress}
                locationSelected={locationSelectedFromSuggests}
                setLocationSelected={setLocationSelectedFromSuggests}
                windowZIndex={10100}
                includeWindowScroll={false}
            />}
            {showCityAutoComplete && <AutocompleteResultsWindow
                inputFieldRef={locationInputRef}
                windowMaxWidth={"702px"}
                inputValue={getCurrentJobLocationInputProp(jobLocationType).inputValue}
                setInputValue={getCurrentJobLocationInputProp(jobLocationType).setInputValue}
                country={currentJob?.locationCountry || ""}
                showResult={showCityAutoComplete}
                setShowResult={setShowCitiesAutoComplete}
                autocompleteWindowType={AutocompleteWindowTypes.city}
                locationSelected={locationSelectedFromSuggests}
                setLocationSelected={setLocationSelectedFromSuggests}
                windowZIndex={10100}
                includeWindowScroll={false}
            />}
            <JobLocationSelectionComponent
                jobLocationTypeEnumValue={jobLocationType}
                setJobLocationTypeEnumValue={setJobLocationType}
                locationInputRef={locationInputRef}
                inPersonJobLocation={inPersonJobLocation}
                setInPersonJobLocation={setInPersonJobLocation}
                generalJobLocation={generalJobLocation}
                setGeneralJobLocation={setGeneralJobLocation}
                remoteJobLocation={remoteJobLocation}
                setRemoteJobLocation={setRemoteJobLocation}
                onRoadJobLocation={onRoadJobLocation}
                setOnRoadJobLocation={setOnRoadJobLocation}
                setShowStreetsAutocomplete={setShowStreetsAutocomplete}
                setShowCitiesAutocomplete={setShowCitiesAutoComplete}
                executeFormValidation={executeFormValidation}
                setExecuteFormValidation={setExecuteFormValidation}
                locationSelectedFromSuggests={locationSelectedFromSuggests}
                setLocationSelectedFromSuggests={setLocationSelectedFromSuggests}
                locationError={locationError}
                setLocationError={setLocationError}
                includeWindowScroll={false}
            />
        </>
    )
}

export default ChangeJobLocationDialogContent;
