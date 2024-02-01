import React, {ChangeEvent, Dispatch, FC, SetStateAction, useState} from 'react';
import './DateSelector.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";
import {TimeStamps} from "../../enums/TimeStamps";
import {months} from "../../AppConstData/Months";

interface DateSelectorProps {
    selectValue: string;
    setSelectValue: Dispatch<SetStateAction<string>>;
    timeStamp: TimeStamps;
    firstYear?: number;
    lastYear?: number;
}

const DateSelector: FC<DateSelectorProps> = ({
                                                 selectValue,
                                                 setSelectValue,
                                                 timeStamp,
                                                 lastYear,
                                                 firstYear
                                             }) => {
    const [inputFocus, setSelectFocus] = useState(false);
    let years: number[] = [];
    if (firstYear && lastYear) {
        const yearsRange = lastYear - firstYear + 1;
        years = Array.from({length: yearsRange}, (_, index) => lastYear - index);
    }


    function handleSelectFocus() {
        setSelectFocus(true);
    }

    function handleSelectBlur() {
        setSelectFocus(false);
    }

    function selectAnotherValue(e: ChangeEvent<HTMLSelectElement>) {
        setSelectValue(e.target.value);
    }

    return (
        <div className={"date-select-container"}>
            <div className={`border-lining`}>

            </div>
            <select
                className={"field-select"}
                id="countries"
                name="countries"
                value={selectValue}
                onChange={selectAnotherValue}
                onFocus={handleSelectFocus}
                onBlur={handleSelectBlur}
            >
                <option>{timeStamp == TimeStamps.Month ? "Month" : "Year"}</option>
                {timeStamp == TimeStamps.Month &&
                    months.map((month, index) => (
                        <option key={index} value={month.name}>{month.name}</option>))
                }
                :
                {timeStamp == TimeStamps.Year &&
                    years.map((year, index) => (
                        <option key={index} value={year}>{year}</option>))
                }
            </select>
            <div className={"selectArrow"}>
                <FontAwesomeIcon className={"svg1rem"} icon={faChevronDown}/>
            </div>
        </div>
    )
};

export default DateSelector;
