import React, {Dispatch, FC, SetStateAction, useEffect, useRef, useState} from 'react';
import './EditJobLocationDialog.scss';
import useJobCreation from "../../../../../hooks/useJobCreation";
import {JobLocationTypes} from "../../../../../enums/modelDataEnums/JobLocationTypes";
import {useJobLocationType} from "../../../../../hooks/useJobLocationType";
import {IncompleteJobService} from "../../../../../services/incompleteJobService";
import {UpdatedIncompleteJobDTO} from "../../../../../DTOs/jobRelatetedDTOs/UpdatedIncompleteJobDTO";
import {logErrorInfo} from "../../../../../utils/logErrorInfo";
import AutocompleteResultsWindow
    from "../../../../../JobSeekerSidePages/EditContactInfoPage/PageComponents/AutocompleteResultsWindow/AutocompleteResultsWindow";
import {AutocompleteWindowTypes} from "../../../../../enums/utilityEnums/AutocompleteWindowTypes";
import EditJobPostDialog from "../EditJobPostDialog/EditJobPostDialog";
import JobLocationSelectionComponent
    from "../../../SharedComponents/JobLocationSelectionComponent/JobLocationSelectionComponent";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTriangleExclamation} from "@fortawesome/free-solid-svg-icons";

interface EditJobLocationDialogProps {
    showDialog: boolean;
    setShowDialog: Dispatch<SetStateAction<boolean>>;
}

const EditJobLocationDialog: FC<EditJobLocationDialogProps> = ({
                                                                   showDialog,
                                                                   setShowDialog
                                                               }) => {
    const {incompleteJob, setIncompleteJob} = useJobCreation();
    const [jobLocationType, setJobLocationType] = useState(incompleteJob?.jobLocationType || JobLocationTypes.InPerson);
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
    const [requestInProgress, setRequestInProgress] = useState(false);
    const incompleteJobService = new IncompleteJobService();

    useEffect(() => {
        if (incompleteJob?.location){
            setLocationSelectedFromSuggests(true);
            getCurrentJobLocationInputProp(jobLocationType).setInputValue(incompleteJob?.location || "");
        }
    }, []);

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
            const updatedJob: UpdatedIncompleteJobDTO = {
                ...incompleteJob,
                jobLocationType : jobLocationType,
                location : getCurrentJobLocationInputProp(jobLocationType).inputValue
            }
            const retrievedJob = await incompleteJobService.updateJobCreation(incompleteJob!.id, updatedJob);
            setIncompleteJob(retrievedJob);
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
        <>
            {showStreetsAutocomplete && <AutocompleteResultsWindow
                inputFieldRef={locationInputRef}
                windowMaxWidth={"550px"}
                inputValue={getCurrentJobLocationInputProp(jobLocationType).inputValue}
                setInputValue={getCurrentJobLocationInputProp(jobLocationType).setInputValue}
                country={incompleteJob?.locationCountry || ""}
                showResult={showStreetsAutocomplete}
                setShowResult={setShowStreetsAutocomplete}
                autocompleteWindowType={AutocompleteWindowTypes.streetAddress}
                locationSelected={locationSelectedFromSuggests}
                setLocationSelected={setLocationSelectedFromSuggests}
                windowZIndex={10100}
            />}
            {showCityAutoComplete && <AutocompleteResultsWindow
                inputFieldRef={locationInputRef}
                windowMaxWidth={"550px"}
                inputValue={getCurrentJobLocationInputProp(jobLocationType).inputValue}
                setInputValue={getCurrentJobLocationInputProp(jobLocationType).setInputValue}
                country={incompleteJob?.locationCountry || ""}
                showResult={showCityAutoComplete}
                setShowResult={setShowCitiesAutoComplete}
                autocompleteWindowType={AutocompleteWindowTypes.city}
                locationSelected={locationSelectedFromSuggests}
                setLocationSelected={setLocationSelectedFromSuggests}
                windowZIndex={10100}
            />}
            <EditJobPostDialog
                showDialog={showDialog}
                setShowDialog={setShowDialog}
                requestInProgress={requestInProgress}
                executeJobEditing={editLocation}
            >
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
            </EditJobPostDialog></>
    )
}

export default EditJobLocationDialog;
