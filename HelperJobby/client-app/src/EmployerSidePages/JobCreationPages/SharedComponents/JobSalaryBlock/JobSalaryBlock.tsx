import React, {ChangeEvent, Dispatch, FC, SetStateAction, useEffect} from 'react';
import './JobSalaryBlock.scss';
import CustomSelectWindow from "../../../../EmployersSideComponents/CustomSelectWindow/CustomSelectWindow";
import {salaryRatesMapData, showPayByOptionsMapData} from "../../../../AppConstData/PayRelatedData";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleExclamation, faTriangleExclamation} from "@fortawesome/free-solid-svg-icons";
import SalaryAmountInputField from "../../../../EmployersSideComponents/SalaryAmountInputField/SalaryAmountInputField";
import {
    minimalSalaryIsTooLowError,
    useSalaryValidation
} from "../../../../hooks/comnonentSharedHooks/useSalaryValidation";
import {useShowPayByOption} from "../../../../hooks/comnonentSharedHooks/useShowPayByOption";

interface JobSalaryBlockProps {
    showPayBy: string;
    setShowPayBy: Dispatch<SetStateAction<string>>;
    salaryRate: string;
    setSalaryRate: Dispatch<SetStateAction<string>>;
    rangeMinSalaryAmount: string;
    setRangeMinSalaryAmount: Dispatch<SetStateAction<string>>;
    rangeMaxSalaryAmount: string;
    setRangeMaxSalaryAmount: Dispatch<SetStateAction<string>>;
    exactSalaryAmount: string;
    setExactSalaryAmount: Dispatch<SetStateAction<string>>;
    startingSalaryAmount: string;
    setStartingSalaryAmount: Dispatch<SetStateAction<string>>;
    maximumSalaryAmount: string;
    setMaximumSalaryAmount: Dispatch<SetStateAction<string>>;
    isInvalidMinSalary: boolean;
    setIsInvalidMinSalary: Dispatch<SetStateAction<boolean>>;
    isInvalidMaxSalary: boolean;
    setIsInvalidMaxSalary: Dispatch<SetStateAction<boolean>>;
    currency: string;
    minSalaryInputError: string;
    setMinSalaryInputError: Dispatch<SetStateAction<string>>;
    maxSalaryInputError: string;
    setMaxSalaryInputError: Dispatch<SetStateAction<string>>;
    minSalaryMeetsRequirement: boolean;
    setMinSalaryMeetsRequirement: Dispatch<SetStateAction<boolean>>;
    showMissingSalaryWarning: boolean;
    setShowMissingSalaryWarning: Dispatch<SetStateAction<boolean>>;
    includeWindowScroll: boolean;
    selectWindowsZIndex?: number;
}

const JobSalaryBlock: FC<JobSalaryBlockProps> = ({
                                                     showPayBy,
                                                     setShowPayBy,
                                                     salaryRate,
                                                     setSalaryRate,
                                                     rangeMinSalaryAmount,
                                                     setRangeMinSalaryAmount,
                                                     rangeMaxSalaryAmount,
                                                     setRangeMaxSalaryAmount,
                                                     exactSalaryAmount,
                                                     setExactSalaryAmount,
                                                     startingSalaryAmount,
                                                     setStartingSalaryAmount,
                                                     maximumSalaryAmount,
                                                     setMaximumSalaryAmount,
                                                     isInvalidMinSalary,
                                                     setIsInvalidMinSalary,
                                                     isInvalidMaxSalary,
                                                     setIsInvalidMaxSalary,
                                                     currency,
                                                     minSalaryInputError,
                                                     setMinSalaryInputError,
                                                     maxSalaryInputError,
                                                     setMaxSalaryInputError,
                                                     minSalaryMeetsRequirement,
                                                     setMinSalaryMeetsRequirement,
                                                     showMissingSalaryWarning,
                                                     setShowMissingSalaryWarning,
                                                     includeWindowScroll,
                                                     selectWindowsZIndex
                                                 }) => {

    const {isValidSalaryValueProvided, validateMaxSalaryInput, validateMinSalaryInput} =
        useSalaryValidation(
            setIsInvalidMinSalary,
            setIsInvalidMaxSalary,
            setShowMissingSalaryWarning,
            setMaxSalaryInputError,
            setMinSalaryInputError,
            minSalaryMeetsRequirement,
            salaryRate,
            showPayBy
        );

    const {getSalaryInputProp} = useShowPayByOption(
        rangeMinSalaryAmount, setRangeMinSalaryAmount,
        exactSalaryAmount, setExactSalaryAmount,
        startingSalaryAmount, setStartingSalaryAmount,
        maximumSalaryAmount, setMaximumSalaryAmount);

    useEffect(() => {
        const currentSalaryValue = getSalaryInputProp(showPayBy).salaryInput;
        if (currentSalaryValue) {
            setShowMissingSalaryWarning(false);
            isValidSalaryValueProvided(currentSalaryValue);
            if (showPayBy == "Range" && rangeMaxSalaryAmount) {
                validateMaxSalaryInput(rangeMinSalaryAmount, rangeMaxSalaryAmount)
            }
        } else {
            setIsInvalidMinSalary(false);
            setIsInvalidMaxSalary(false);
            setMinSalaryInputError("");
            setMaxSalaryInputError("");
        }
    }, [showPayBy, salaryRate]);

    function onMinSalaryInputChange(e: ChangeEvent<HTMLInputElement>) {
        getSalaryInputProp(showPayBy).setSalaryInput(e.target.value);
        validateMinSalaryInput(e.target.value, rangeMaxSalaryAmount);
    }

    function onMaxSalaryInputChange(e: ChangeEvent<HTMLInputElement>) {
        setRangeMaxSalaryAmount(e.target.value);
        validateMaxSalaryInput(rangeMinSalaryAmount, e.target.value);
    }

    function removeInvalidMinimalSalaryError() {
        setMinSalaryMeetsRequirement(!minSalaryMeetsRequirement);
        if (!minSalaryMeetsRequirement) {
            setIsInvalidMinSalary(false);
        } else {
            setIsInvalidMinSalary(true);
        }
    }


    return (
        <>
            <div className="pb-pay-info-fb">
                <CustomSelectWindow
                    fieldLabel={"Show pay by"}
                    selectedValue={showPayBy}
                    setSelectedValue={setShowPayBy}
                    optionsArr={showPayByOptionsMapData.map(spo => spo.stringValue)}
                    includeWindowScroll={includeWindowScroll}
                    windowZIndex={selectWindowsZIndex}
                />
                <div className={"pi-salary-amount-container"}>
                    {
                        showPayBy === "Range" ?
                            (
                                <>
                                    <div className={"salary-input-box"}>
                                        <SalaryAmountInputField
                                            fieldLabel={"Minimum"}
                                            inputValue={rangeMinSalaryAmount}
                                            setInputValue={setRangeMinSalaryAmount}
                                            currency={currency}
                                            isInvalidValue={isInvalidMinSalary}
                                            onInputChange={onMinSalaryInputChange}
                                            onBlur={() => validateMinSalaryInput(rangeMinSalaryAmount, rangeMaxSalaryAmount)}
                                        />
                                    </div>

                                    <span
                                        className={"salary-input-box semi-dark-default-text mt1rem"}
                                        style={{
                                            alignSelf: "center"
                                        }}
                                    >
                                            to
                                        </span>

                                    <div className={"salary-input-box"}>
                                        <SalaryAmountInputField
                                            fieldLabel={"Maximum"}
                                            inputValue={rangeMaxSalaryAmount}
                                            setInputValue={setRangeMaxSalaryAmount}
                                            currency={currency}
                                            isInvalidValue={isInvalidMaxSalary}
                                            onInputChange={onMaxSalaryInputChange}
                                            onBlur={() => validateMaxSalaryInput(rangeMinSalaryAmount, rangeMaxSalaryAmount)}
                                        />
                                    </div>
                                </>

                            )
                            :
                            (
                                <div className={"salary-input-box"}>
                                    <SalaryAmountInputField
                                        fieldLabel={"Amount"}
                                        inputValue={getSalaryInputProp(showPayBy).salaryInput}
                                        setInputValue={getSalaryInputProp(showPayBy).setSalaryInput}
                                        currency={currency}
                                        isInvalidValue={isInvalidMinSalary}
                                        onInputChange={onMinSalaryInputChange}
                                        onBlur={() => validateMinSalaryInput(getSalaryInputProp(showPayBy).salaryInput, rangeMaxSalaryAmount)}
                                    />
                                </div>
                            )
                    }
                </div>
                <CustomSelectWindow
                    fieldLabel={"Rate"}
                    selectedValue={salaryRate}
                    setSelectedValue={setSalaryRate}
                    optionsArr={salaryRatesMapData.map(sr => sr.stringValue)}
                    includeWindowScroll={includeWindowScroll}
                    windowZIndex={selectWindowsZIndex}
                />
            </div>
            {isInvalidMinSalary &&
                <div className={"error-box"}>
                    <FontAwesomeIcon className={`error-text error-svg`} icon={faCircleExclamation}/>
                    <span className={"error-text"}>{minSalaryInputError}</span>
                </div>
            }
            {(isInvalidMaxSalary && !isInvalidMinSalary && showPayBy == "Range") &&
                <div className={"error-box"}>
                    <FontAwesomeIcon className={`error-text error-svg`} icon={faCircleExclamation}/>
                    <span className={"error-text"}>{maxSalaryInputError}</span>
                </div>
            }
            {minSalaryInputError == minimalSalaryIsTooLowError &&
                <div className={"checkbox-container"} onClick={removeInvalidMinimalSalaryError}>
                    <input className={"checkbox"} onChange={removeInvalidMinimalSalaryError}
                           checked={minSalaryMeetsRequirement} type={"checkbox"}/>
                    <span>This job meets or is exempt from the local and minimum wage requirements</span>
                </div>
            }
            {showMissingSalaryWarning &&
                <div className={"info-notify-container orange-notify-container mt1rem"}>
                    <div className={"warning-pop-up-icon mr1rem"}>
                        <FontAwesomeIcon icon={faTriangleExclamation}/>
                    </div>
                    <div className={"ntf-msg-with-ttl-container"}>
                        <div className={"semi-dark-small-text bold-text"}>
                            Missing pay information
                        </div>
                        <div className={"semi-dark-small-text"}>
                            If you do not provide pay information, job seekers won't see job offer if they
                            will decide to sort jobs by pay.
                            Jobs without employer-provided pay have lower visibility
                            on HelperJobby and receive fewer quality applications.
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default JobSalaryBlock;
