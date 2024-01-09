import React, {FC, useState} from 'react';
import './QueryParameter.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSortDown, faXmark} from "@fortawesome/free-solid-svg-icons";

interface QueryParameterProps {
    boxValue : string;
    isSelected : boolean;
}

const QueryParameter: FC<QueryParameterProps> = ({boxValue, isSelected}) => {

    return  (
        <button className={`query-param-box ${isSelected ? "selected-query-box" : ""}`}>
            <span className={"param-name"}>
                {boxValue}
            </span>
            {isSelected ? <></> :  boxValue !== "Remote" && <FontAwesomeIcon className={"select-query-param"} icon={faSortDown} />}
            {isSelected && boxValue === "Remote" && <FontAwesomeIcon className={"remove-query-param"} icon={faXmark} />}
            {!isSelected && boxValue === "Remote" && <FontAwesomeIcon className={"select-query-param"} icon={faSortDown} />}
        </button>
)};

export default QueryParameter;
