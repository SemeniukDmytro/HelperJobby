import {Dispatch, SetStateAction, useCallback} from "react";
import {JobLocationTypes} from "../../enums/modelDataEnums/JobLocationTypes";

export function useJobLocationType(
    inPersonJobLocation : string, setInPersonJobLocation : Dispatch<SetStateAction<string>>,
    generalJobLocation : string, setGeneralJobLocation : Dispatch<SetStateAction<string>>,
    remoteJobLocation : string, setRemoteJobLocation : Dispatch<SetStateAction<string>>,
    onRoadJobLocation : string, setOnRoadJobLocation : Dispatch<SetStateAction<string>>){
    
    const getCurrentJobLocationInputProp = useCallback((jobLocationType : JobLocationTypes)
        : { inputValue: string, setInputValue: Dispatch<SetStateAction<string>> } => {
        switch (jobLocationType) {
            case JobLocationTypes.InPerson:
                return {inputValue: inPersonJobLocation, setInputValue: setInPersonJobLocation};
            case JobLocationTypes.GeneralLocation:
                return {inputValue: generalJobLocation, setInputValue: setGeneralJobLocation};
            case JobLocationTypes.Remote:
                return {inputValue: remoteJobLocation, setInputValue: setRemoteJobLocation};
            case JobLocationTypes.OnRoad:
                return {inputValue: onRoadJobLocation, setInputValue: setOnRoadJobLocation};
        }
    }, [inPersonJobLocation, generalJobLocation, remoteJobLocation, onRoadJobLocation]);
    
    return {getCurrentJobLocationInputProp};
    
}