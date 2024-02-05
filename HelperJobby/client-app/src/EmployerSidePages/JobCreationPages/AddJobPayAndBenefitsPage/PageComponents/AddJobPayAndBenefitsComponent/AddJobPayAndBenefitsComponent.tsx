import React, {ChangeEvent, FC, FormEvent, useEffect, useRef, useState} from 'react';
import './AddJobPayAndBenefitsComponent.scss';
import PageTitleWithImage from "../../../../../EmployersSideComponents/PageTitleWithImage/PageTitleWithImage";
import Wages from "../../../../../Components/Icons/Wages";
import CustomSelectWindow from "../../../../../EmployersSideComponents/CustomSelectWindow/CustomSelectWindow";
import {salaryRates, showPayByOptions} from "../../../../../AppConstData/PayRelatedData";
import SalaryAmountInputField from "../../../../../Components/SalaryAmountInputField/SalaryAmountInputField";
import {countriesWithCurrencies} from "../../../../../AppConstData/CountriesWithCurrencies";
import {
    getValidFloatNumberFromString,
    isValidNumber
} from "../../../../../utils/validationLogic/numbersValidators";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faChevronDown,
    faChevronUp,
    faCircleExclamation,
    faTriangleExclamation
} from "@fortawesome/free-solid-svg-icons";
import {checkMinimalSalary} from "../../../../../utils/validationLogic/checkMinimalSalary";
import {benefitsStringValues} from "../../../../../AppConstData/JobEnumsToStringsArrays";
import JobFeature from "../../../../../EmployersSideComponents/JobFeature/JobFeature";
import {benefitStringToEnumMap} from "../../../../../utils/convertLogic/enumToStringConverter";

import JobCreateNavigationButtons
    from "../../../SharedComponents/JobCreateNavigationButtons/JobCreateNavigationButtons";
import {useNavigate} from "react-router-dom";
import EmployerPagesPaths from "../../../../../AppRoutes/Paths/EmployerPagesPaths";
import EmployeeBenefits from "../../../../../enums/modelDataEnums/EmployeeBenefits";

interface AddJobPayAndBenefitsComponentProps {
}

const AddJobPayAndBenefitsComponent: FC<AddJobPayAndBenefitsComponentProps> = () => {
    const [showPayBy, setShowPayBy] = useState("Range");
    const [salaryRate, setSalaryRate] = useState("per hour");
    const [minSalaryAmount, setMinSalaryAmount] = useState("");
    const [maxSalaryAmount, setMaxSalaryAmount] = useState("");
    const [isInvalidMinSalary, setIsInvalidMinSalary] = useState(false);
    const [isInvalidMaxSalary, setIsInvalidMaxSalary] = useState(false);
    const currency = getCurrency();
    const [minSalaryInputError, setMinSalaryInputError] = useState("");
    const [maxSalaryInputError, setMaxSalaryInputError] = useState("");
    const [minSalaryMeetsLaw, setMinSalaryMeetsLaw] = useState(false);
    const [showMissingSalaryWarning, setShowMissingSalaryWaring] = useState(false);
    const [selectedBenefits, setSelectedBenefits] = useState<EmployeeBenefits[]>([]);
    const [benefitsBoxHeight, setBenefitsBoxHeight] = useState("78px");
    const benefitsListRef = useRef<HTMLUListElement>(null);
    const [showFullBenefitsList, setShowFullBenefitsList] = useState(false);
    const navigate = useNavigate();
    
    const invalidNumberError: string = "This number doesn't look right. Use a valid format (e.g. 50,000.00).";
    const minimalSalaryIsTooLowError: string = "This wage appears to be below the minimum wage for this location. Update the minimum pay or check the box to confirm that your job is exempt from local minimum wage requirements.";
    const maximumSalaryIsLowerThanMinimumError: string ="Use a range (low to high), or make another selection for pay.";

    useEffect(() => {
        removeErrors();
        setMinSalaryInputError("");
        setMaxSalaryInputError("");
    }, [showPayBy]);

    function onMinSalaryInputChange(e: ChangeEvent<HTMLInputElement>) {
        setMinSalaryAmount(e.target.value);
        validateMinSalaryInput(e.target.value);
    }

    function onMaxSalaryInputChange(e: ChangeEvent<HTMLInputElement>) {
        setMaxSalaryAmount(e.target.value);
        validateMaxSalaryInput(minSalaryAmount, e.target.value);
    }

    function validateMinSalaryInput(minSalaryAmountString: string) {
        if (!minSalaryAmountString && !maxSalaryAmount){
            setIsInvalidMinSalary(false);
            setShowMissingSalaryWaring(true);
            return;
        }
        else {
            setShowMissingSalaryWaring(false);
        } 
        
        if (!isValidNumber(minSalaryAmountString)) {
            setIsInvalidMinSalary(true);
            setMinSalaryInputError(invalidNumberError)
            return;
        }
        
        const minSalaryAmountNumber = getValidFloatNumberFromString(minSalaryAmountString);
        
        if (!checkMinimalSalary(minSalaryAmountNumber, salaryRate)) {
            setMinSalaryInputError(minimalSalaryIsTooLowError)
            if (!minSalaryMeetsLaw){
                setIsInvalidMinSalary(true);
            }
            else {
                setIsInvalidMinSalary(false);   
            }
        } else {
            setMinSalaryInputError("");
            setIsInvalidMinSalary(false);
        }
        
        isValidSalaryRageProvided(minSalaryAmountString, maxSalaryAmount)
    }

    function validateMaxSalaryInput(minSalaryAmountValue: string, maxSalaryAmountValue: string) {
        if (!minSalaryAmountValue && !maxSalaryAmountValue){
            setShowMissingSalaryWaring(true);
            setIsInvalidMaxSalary(false);
            return;
        }
        else {
            setShowMissingSalaryWaring(false);
        }
        
        if (!isValidNumber(maxSalaryAmountValue)) {
            setIsInvalidMaxSalary(true);
            setMaxSalaryInputError(invalidNumberError)
            return;
        }
        isValidSalaryRageProvided(minSalaryAmountValue, maxSalaryAmountValue)
    }
    
    function isValidSalaryRageProvided(minSalaryAmount: string, maxSalaryAmount: string){
        const minSalaryAmountNumber = getValidFloatNumberFromString(minSalaryAmount);
        const maxSalaryAmountNumber = getValidFloatNumberFromString(maxSalaryAmount);

        if (minSalaryAmountNumber >= maxSalaryAmountNumber) {
            setIsInvalidMaxSalary(true);
            setMaxSalaryInputError(maximumSalaryIsLowerThanMinimumError);
        } else {
            setMaxSalaryInputError("")
            setIsInvalidMaxSalary(false);
        }
    }
    

    function getCurrency() {
        const currency = countriesWithCurrencies.find(c => c.country === "Canada")?.currency;
        return currency || "";
    }

    function removeInvalidMinimalSalaryError() {
        setMinSalaryMeetsLaw(!minSalaryMeetsLaw);
        if (!minSalaryMeetsLaw){
            setIsInvalidMinSalary(false);   
        }
        else {
            setIsInvalidMinSalary(true);
        }
    }
    
    function removeErrors(){
        setMinSalaryAmount("");
        setMaxSalaryAmount("");
        setIsInvalidMinSalary(false);
        setIsInvalidMaxSalary(false);
    }

    function addBenefit(benefitString: string) {
        const schedule = benefitStringToEnumMap(benefitString);
        if (schedule && !selectedBenefits.includes(schedule)) {
            setSelectedBenefits(prevSelectedBenefits => [...prevSelectedBenefits, schedule]);
        } else if (schedule) {
            setSelectedBenefits(prevSelectedBenefits =>
                prevSelectedBenefits.filter(type => type !== schedule),
            );
        }
    }

    function handleBenefitsListAppearance() {
        if (showFullBenefitsList){
            setShowFullBenefitsList(false);
            setBenefitsBoxHeight("78px");
        }
        else {
            setShowFullBenefitsList(true);
            const scheduleListRefBoundingRect = benefitsListRef.current?.getBoundingClientRect();
            setBenefitsBoxHeight(`${scheduleListRefBoundingRect?.height}px`)
        }
    }

    function goToPreviousPage() {
        navigate(EmployerPagesPaths.JOB_DETAILS)
    }

    function handlePayAndBenefitSubmit(e : FormEvent) {
        e.preventDefault();
        navigate(EmployerPagesPaths.DESCRIPTION_AND_APPLICATION_DETAILS)
    }

    return (
        <div className={"employers-centralized-page-layout"}>
            <PageTitleWithImage imageElement={<Wages/>} title={"Add job pay and benefits"}/>
            <div className={"emp-form-fb"}>
                <form className={"emp-form"}>
                    <span className={"small-title"}>Pay</span>
                    <div className="pb-pay-info-fb">
                        <CustomSelectWindow
                            fieldLabel={"Show pay by"}
                            selectedValue={showPayBy}
                            setSelectedValue={setShowPayBy}
                            optionsArr={showPayByOptions}
                        />
                        <div className={"pi-salary-amount-container"}>
                            {
                                showPayBy === "Range" ?
                                    (
                                        <>
                                            <div className={"salary-input-box"}>
                                                <SalaryAmountInputField
                                                    fieldLabel={"Minimum"}
                                                    inputValue={minSalaryAmount}
                                                    setInputValue={setMinSalaryAmount}
                                                    currency={currency}
                                                    isInvalidValue={isInvalidMinSalary}
                                                    onInputChange={onMinSalaryInputChange}
                                                    onBlur={() => validateMinSalaryInput(minSalaryAmount)}
                                                />
                                            </div>

                                            <span
                                                className={"salary-input-box dark-default-text mt1rem"}
                                                style={{
                                                    alignSelf: "center"
                                                }}
                                            >
                                            to
                                        </span>

                                            <div className={"salary-input-box"}>
                                                <SalaryAmountInputField
                                                    fieldLabel={"Maximum"}
                                                    inputValue={maxSalaryAmount}
                                                    setInputValue={setMaxSalaryAmount}
                                                    currency={currency}
                                                    isInvalidValue={isInvalidMaxSalary}
                                                    onInputChange={onMaxSalaryInputChange}
                                                    onBlur={() => validateMaxSalaryInput(minSalaryAmount, maxSalaryAmount)}
                                                />
                                            </div>
                                        </>

                                    )
                                    :
                                    (
                                        <div className={"salary-input-box"}>
                                            <SalaryAmountInputField
                                                fieldLabel={"Amount"}
                                                inputValue={minSalaryAmount}
                                                setInputValue={setMinSalaryAmount}
                                                currency={currency}
                                                isInvalidValue={isInvalidMinSalary}
                                                onInputChange={onMinSalaryInputChange}
                                                onBlur={() => validateMinSalaryInput(minSalaryAmount)}
                                            />
                                        </div>
                                    )
                            }
                        </div>
                        <CustomSelectWindow
                            fieldLabel={"Rate"}
                            selectedValue={salaryRate}
                            setSelectedValue={setSalaryRate}
                            optionsArr={salaryRates}
                        />
                    </div>
                    {(isInvalidMinSalary || isInvalidMaxSalary) &&
                        <div className={"error-box"}>
                            <FontAwesomeIcon className={`error-text error-svg`} icon={faCircleExclamation}/>
                            {(minSalaryInputError === minimalSalaryIsTooLowError && !minSalaryMeetsLaw) ?
                                <span className={"error-text"}>{minSalaryInputError ? minSalaryInputError : maxSalaryInputError}</span>
                                :
                                <span className={"error-text"}>{maxSalaryInputError ? maxSalaryInputError : minSalaryInputError}</span>
                            }
                        </div>}
                    {minSalaryInputError == minimalSalaryIsTooLowError &&
                        <div className={"checkbox-container"} onClick={removeInvalidMinimalSalaryError}>
                            <input className={"checkbox"} onChange={removeInvalidMinimalSalaryError} checked={minSalaryMeetsLaw} type={"checkbox"}/>
                            <span>This job meets or is exempt from the local and minimum wage requirements</span>
                        </div>
                    }
                    {showMissingSalaryWarning &&
                        <div className={"info-notify-container orange-notify-container mt1rem"}>
                            <div className={"warning-pop-up-icon mr1rem"}>
                                <FontAwesomeIcon icon={faTriangleExclamation}/>
                            </div>
                            <div className={"ntf-msg-with-ttl-container"}>
                                <div className={"dark-small-text bold-text"}>
                                    Missing pay information
                                </div>
                                <div className={"dark-small-text"}>
                                    If you do not provide pay information, job seekers won't see job offer if they
                                    will decide to sort jobs by pay.
                                    Jobs without employer-provided pay have lower visibility
                                    on HelperJobby and receive fewer quality applications.
                                </div>
                            </div>
                        </div>}
                    <div className={"content-separation-line mt3rem mb3rem"}></div>
                    <div className={"small-title"}>
                        Benefits
                    </div>
                    <div
                        className={"job-features-fb"}
                        style={{
                            height: benefitsBoxHeight
                        }}
                    >
                        <ul
                            className={"job-features-list"}
                            ref={benefitsListRef}
                        >
                            {benefitsStringValues.map((benefits, index) => (
                                <JobFeature
                                    key={index}
                                    featureName={benefits}
                                    isSelected={selectedBenefits.includes(benefitStringToEnumMap(benefits)!)}
                                    onClick={() => addBenefit(benefits)}
                                />
                            ))}
                        </ul>
                    </div>
                    <div className={"mt05rem"}>
                   <span className={"bold-navigation-link"} onClick={handleBenefitsListAppearance}>
                        <span>{`${showFullBenefitsList ? "Show less" : "Show more"}`}</span>
                       {showFullBenefitsList ?
                           <FontAwesomeIcon className={'svg1rem ml1rem'} icon={faChevronUp}/>
                           :
                           <FontAwesomeIcon className={'svg1rem ml1rem'} icon={faChevronDown}/>
                       }
                    </span>
                    </div>
                    <JobCreateNavigationButtons
                        backButtonOnClick={goToPreviousPage}
                        nextPageButtonClick={handlePayAndBenefitSubmit}
                    />
                </form>
            </div>
        </div>
    )
};

export default AddJobPayAndBenefitsComponent;
