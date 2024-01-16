import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import './TimePeriod.scss';
import DateSelector from "../../../../Components/DateSelector/DateSelector";
import {TimeStamps} from "../../../../enums/TimeStamps";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleExclamation} from "@fortawesome/free-solid-svg-icons";
import {isNanAfterIntParse} from "../../../../utils/isNanAfterIntParse";

interface TimePeriodProps {
    fromMonth : string;
    setFromMonth : Dispatch<SetStateAction<string>>;
    fromYear : string;
    setFromYear : Dispatch<SetStateAction<string>>;
    toMonth : string;
    setToMonth : Dispatch<SetStateAction<string>>;
    toYear : string;
    setToYear : Dispatch<SetStateAction<string>>;
}

const TimePeriod: FC<TimePeriodProps> = (props) => {
    const [fromYearFirstValue, setFromYearFirstValue] = useState(getCurrentYear() - 100);
    const [toYearFirstValue, setToYearFirstValue] = 
        useState(getToYearFirstValue);
    const [fromError, setFromError] = useState("");
    const [toError, setToError] = useState("")
    
    
    const monthWithoutYearError = "Cannot specify a month without a year.";
    const endDateNanError = "End date must be after start date";
    const startDateNanError = "Start date must be after end date";

    useEffect(() => {
        if (!isNanAfterIntParse(props.toYear) && (isNanAfterIntParse(props.fromYear) && (props.fromMonth === "Month" || !props.fromMonth))){
            setToError(endDateNanError);
            setFromError("");
        }
        else if ((isNanAfterIntParse(props.toYear) && (props.toMonth === "Month" || !props.toMonth)) && !isNanAfterIntParse(props.fromYear)){
            setFromError(startDateNanError);
            setToError("")
        }
        
        else if (props.toYear < props.fromYear){
            setFromError(endDateNanError)
            setToError("");
        }
        else if (isNanAfterIntParse(props.fromYear) && props.fromMonth !== "Month" && props.fromMonth){
            setFromError(monthWithoutYearError)
        }
        else if (isNanAfterIntParse(props.toYear) && props.toMonth !== "Month" && props.toMonth){
            setToError(monthWithoutYearError)
        }
        else {
            setToError("");
            setFromError("");
        }
        
    }, [props.toMonth, props.toYear, props.fromMonth, props.fromYear]);
    

    useEffect(() => {
        setToYearFirstValue(getToYearFirstValue());
    }, [props.fromYear]);
    
    function getCurrentYear(){
        return new Date().getFullYear();
    }
    
    function getToYearFirstValue() {
        if (Number.parseInt(props.fromYear)){
            return Number.parseInt(props.fromYear);
        }
        else {
            return getCurrentYear() - 100;
        }
    }
    
    
    return (
        <>
            <div className={"time-stamp-container"}>
                <div className={"double-select-label"}>From</div>
                <div className={"double-select-container"}>
                    <DateSelector
                        selectValue={props.fromMonth}
                        setSelectValue={props.setFromMonth}
                        timeStamp={TimeStamps.Month}/>
                    <DateSelector 
                        selectValue={props.fromYear} 
                        setSelectValue={props.setFromYear}
                        timeStamp={TimeStamps.Year}
                        firstYear={fromYearFirstValue}
                        lastYear={getCurrentYear()}/>
                </div>
            </div>
            {fromError && <div className={"error-box"}>
                <FontAwesomeIcon className={`error-text error-svg`} icon={faCircleExclamation}/>
                <span className={"error-text"}>{fromError}</span>
            </div>}
            <div className={"input-field-spacing"}></div>
            <div className={"time-stamp-container"}>
                <div className={"double-select-label"}>To</div>
                <div className={"double-select-container"}>
                    <DateSelector
                        selectValue={props.toMonth}
                        setSelectValue={props.setToMonth}
                        timeStamp={TimeStamps.Month}/>
                    <DateSelector
                        selectValue={props.toYear}
                        setSelectValue={props.setToYear}
                        timeStamp={TimeStamps.Year}
                        firstYear={toYearFirstValue}
                        lastYear={getCurrentYear() + 15}/>
                </div>
            </div>
            {toError && <div className={"error-box"}>
                <FontAwesomeIcon className={`error-text error-svg`} icon={faCircleExclamation}/>
                <span className={"error-text"}>{toError}</span>
            </div>}
            <div className={"input-field-spacing"}></div>
        </>
    )
}

export default TimePeriod;
