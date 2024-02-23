import React, {Dispatch, FC, SetStateAction, useEffect, useRef, useState} from 'react';
import './QueryParameter.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSortDown, faXmark} from "@fortawesome/free-solid-svg-icons";
import {JobQueryParams} from "../../../../enums/utilityEnums/JobQueryParams";

interface QueryParameterProps {
    queryParam: JobQueryParams;
    isSelected: boolean;
    setShowMoreOptions: Dispatch<SetStateAction<boolean>>;
    onClick: () => void;
}

const QueryParameter: FC<QueryParameterProps> = ({
                                                     queryParam, isSelected, setShowMoreOptions,
                                                     onClick
                                                 }) => {

    const [paramName, setParamName] = useState("");
    const queryParamButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        setParamButtonName();
        const handleDocumentClick = (e: MouseEvent) => {
            const clickedElement = e.target as HTMLElement;
            if (!queryParamButtonRef.current?.contains(clickedElement)) {
                setShowMoreOptions(false);
            }
        };
        document.addEventListener('click', handleDocumentClick);
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);


    function setParamButtonName() {
        switch (queryParam) {
            case JobQueryParams.Pay:
                setParamName("Pay");
                break;
            case JobQueryParams.JobType:
                setParamName("Job type")
                break;
            case JobQueryParams.Language:
                setParamName("Language")
                break;
        }
    }


    return (
        <button
            className={`query-param-box ${isSelected ? "selected-query-box" : ""}`}
            ref={queryParamButtonRef} onClick={onClick}
        >
            <span className={"param-name"}>
                {paramName}
            </span>
            {!isSelected ? (<FontAwesomeIcon className={"select-query-param svg1rem"} icon={faSortDown}/>)
                :
                (<FontAwesomeIcon className={"remove-query-param svg1rem"} icon={faXmark}/>)}
        </button>
    )
};

export default QueryParameter;
