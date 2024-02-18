import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import './TimePeriod.scss';
import DateSelector from "../../../../Components/DateSelector/DateSelector";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleExclamation} from "@fortawesome/free-solid-svg-icons";
import {isNanAfterIntParse} from "../../../../utils/validationLogic/numbersValidators";
import {months} from "../../../../AppConstData/Months";
import {TimeStamps} from "../../../../enums/utilityEnums/TimeStamps";

interface TimePeriodProps {
    fromMonth: string;
    setFromMonth: Dispatch<SetStateAction<string>>;
    fromYear: string;
    setFromYear: Dispatch<SetStateAction<string>>;
    toMonth: string;
    setToMonth: Dispatch<SetStateAction<string>>;
    toYear: string;
    setToYear: Dispatch<SetStateAction<string>>;
    invalidValuesProvided: boolean;
    setInvalidValuesProvided: Dispatch<SetStateAction<boolean>>;
    currentlyEnrolledSelected?: boolean;
}

const TimePeriod: FC<TimePeriodProps> = (props) => {
    const [fromYearFirstValue, setFromYearFirstValue] = useState(getCurrentYear() - 100);
    const [toYearFirstValue, setToYearFirstValue] =
        useState(getToYearFirstValue);
    const [monthWithoutYearFromError, setMonthWithoutYearFromError] = useState("");
    const [monthWithoutYearToError, setMonthWithoutYearToError] = useState("");
    const [invalidYearFromError, setInvalidYearFromError] = useState("");
    const [invalidYearToError, setInvalidYearToError] = useState("");

    const monthWithoutYearError = "Cannot specify a month without a year.";
    const endDateNanError = "End date must be after start date";
    const startDateNanError = "Start date must be after end date";

    useEffect(() => {
        if (!props.currentlyEnrolledSelected) {
            isInvalidYearsProvided();
        }
    }, [props.toYear, props.fromYear]);


    useEffect(() => {
        isMonthWithoutYearProvided();
        if (props.currentlyEnrolledSelected) {
            isInvalidFromYearProvided();
        }
    }, [props.toMonth, props.fromYear, props.toYear, props.fromMonth]);

    useEffect(() => {
        if (monthWithoutYearFromError || monthWithoutYearToError || invalidYearFromError || invalidYearToError) {
            props.setInvalidValuesProvided(true);
        } else {
            props.setInvalidValuesProvided(false);
        }
    }, [monthWithoutYearFromError, monthWithoutYearToError, invalidYearFromError, invalidYearToError]);


    useEffect(() => {
        setToYearFirstValue(getToYearFirstValue());
    }, [props.fromYear]);

    function getCurrentYear() {
        return new Date().getFullYear();
    }

    function getToYearFirstValue() {
        if (Number.parseInt(props.fromYear)) {
            return Number.parseInt(props.fromYear);
        } else {
            return getCurrentYear() - 100;
        }
    }

    function isInvalidYearsProvided() {
        if ((isNanAfterIntParse(props.toYear) && !isNanAfterIntParse(props.fromYear))) {
            setInvalidYearToError(endDateNanError);
            setMonthWithoutYearToError("");
        } else {
            setInvalidYearToError("")
        }

        if (!isNanAfterIntParse(props.toYear) && isNanAfterIntParse(props.fromYear)) {
            setInvalidYearFromError(startDateNanError);
            setMonthWithoutYearFromError("");
        } else {
            setInvalidYearFromError("")
        }
        if (!isNanAfterIntParse(props.toYear) && !isNanAfterIntParse(props.fromYear)) {
            if (Number.parseInt(props.toYear) < Number.parseInt(props.fromYear)) {
                setInvalidYearToError(endDateNanError);
                setMonthWithoutYearToError("");
            } else {
                setInvalidYearToError("");
            }
        }
    }

    function isInvalidFromYearProvided() {
        const currentDate = new Date().toISOString().split("-");
        const selectedMonth = months
            .find((m) => m.name == props.fromMonth)?.monthNumber;
        if (!isNanAfterIntParse(props.fromYear) && selectedMonth) {
            if (selectedMonth > Number.parseInt(currentDate[1]) &&
                Number.parseInt(props.fromYear) >= Number.parseInt(currentDate[0])) {
                setInvalidYearFromError("Start date cannot be later than the current date");
            }
        } else {
            setInvalidYearFromError("")
        }
    }

    function isMonthWithoutYearProvided() {
        if (isNanAfterIntParse(props.fromYear) && props.fromMonth !== "Month" && props.fromMonth) {
            setMonthWithoutYearFromError(monthWithoutYearError)
            setInvalidYearFromError("");
        } else {
            setMonthWithoutYearFromError("");

        }

        if (isNanAfterIntParse(props.toYear) && props.toMonth !== "Month" && props.toMonth) {
            setMonthWithoutYearToError(monthWithoutYearError)
            setInvalidYearToError("");
        } else {
            setMonthWithoutYearToError("");
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
                        timeStamp={TimeStamps.Month}
                    />
                    <DateSelector
                        selectValue={props.fromYear}
                        setSelectValue={props.setFromYear}
                        timeStamp={TimeStamps.Year}
                        firstYear={fromYearFirstValue}
                        lastYear={getCurrentYear()}
                    />
                </div>
            </div>
            {(monthWithoutYearFromError || invalidYearFromError) && <div className={"error-box"}>
                <FontAwesomeIcon className={`error-text error-svg`} icon={faCircleExclamation}/>
                <span className={"error-text"}>{monthWithoutYearFromError}</span>
                <span className={"error-text"}>{invalidYearFromError}</span>
            </div>}
            <div className={"input-field-spacing"}></div>
            <div className={"double-select-label"}>To</div>
            {!props.currentlyEnrolledSelected ?
                (<>
                    <div className={"time-stamp-container"}>
                        <div className={"double-select-container"}>
                            <DateSelector
                                selectValue={props.toMonth}
                                setSelectValue={props.setToMonth}
                                timeStamp={TimeStamps.Month}
                            />
                            <DateSelector
                                selectValue={props.toYear}
                                setSelectValue={props.setToYear}
                                timeStamp={TimeStamps.Year}
                                firstYear={toYearFirstValue}
                                lastYear={getCurrentYear() + 15}
                            />
                        </div>
                    </div>
                    {(monthWithoutYearToError || invalidYearToError) && <div className={"error-box"}>
                        <FontAwesomeIcon className={`error-text error-svg`} icon={faCircleExclamation}/>
                        <span className={"error-text"}>{monthWithoutYearToError}</span>
                        <span className={"error-text"}>{invalidYearToError}</span>
                    </div>}
                </>)
                :
                (<span className={"grey-small-text"}>Present</span>)
            }
            <div className={"input-field-spacing"}></div>
        </>
    )
}

export default TimePeriod;
