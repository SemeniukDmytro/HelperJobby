import React, {ChangeEvent, FC, useState} from 'react';
import './AddJobPayAndBenefitsComponent.scss';
import PageTitleWithImage from "../../../../../EmployersSideComponents/PageTitleWithImage/PageTitleWithImage";
import Wages from "../../../../../Components/Icons/Wages";
import CustomSelectWindow from "../../../../../EmployersSideComponents/CustomSelectWindow/CustomSelectWindow";
import {salaryRates, showPayByOptions} from "../../../../../AppConstData/PayRelatedData";
import SalaryAmountInputField from "../../../../../Components/SalaryAmountInputField/SalaryAmountInputField";
import {countriesWithCurrencies} from "../../../../../AppConstData/CountriesWithCurrencies";
import {
    getValidFloatNumberFromString,
    isNanAfterIntParse,
    isValidNumber
} from "../../../../../utils/validationLogic/numbersValidators";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleExclamation} from "@fortawesome/free-solid-svg-icons";

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
    
    const invalidNumberError: string = "This number doesn't look right. Use a valid format (e.g. 50,000.00).";
    const minimalSalaryIsTooLowError: string = "This wage appears to be below the minimum wage for this location. Update the minimum pay or check the box to confirm that your job is exempt from local minimum wage requirements.";
    const maximumSalaryIsLowerThanMinimumError: string ="Use a range (low to high), or make another selection for pay."; 
    

    function onMinSalaryInputChange(e: ChangeEvent<HTMLInputElement>) {
        setMinSalaryAmount(e.target.value);
        validateMinSalaryInput(e.target.value);
    }

    function onMaxSalaryInputChange(e: ChangeEvent<HTMLInputElement>) {
        setMaxSalaryAmount(e.target.value);
        validateMaxSalaryInput(minSalaryAmount, e.target.value);
    }

    function validateMinSalaryInput(minSalaryAmountString: string) {
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
        if (!isValidNumber(maxSalaryAmountValue)) {
            setIsInvalidMaxSalary(true);
            setMaxSalaryInputError(invalidNumberError)
            return;
        }
        isValidSalaryRageProvided(minSalaryAmountValue, maxSalaryAmountValue)
    }

    function checkMinimalSalary(salary: number, salaryRate: string): boolean {
        switch (salaryRate.toLowerCase()) {
            case "per hour":
                return salary > 16.65;
            case "per day":
                return salary > 100;
            case "per week":
                return salary > 494;
            case "per month":
                return salary > 2000;
            case "per year":
                return salary > 24000;
            default:
                return false;
        }
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

    return (
        <div className={"employers-centralized-page-layout"}>
            <PageTitleWithImage imageElement={<Wages/>} title={"Add job pay and benefits"}/>
            <form className={"emp-form-fb"}>
                <span className={"dark-default-text bold-text mb15rem"}>Pay</span>
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
                                    <div></div>
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
                    <div className={"checkbox-container"}>
                        <input className={"checkbox"} checked={minSalaryMeetsLaw} type={"checkbox"} onChange={removeInvalidMinimalSalaryError}/>
                        <span>This job meets or is exempt from the local and minimum wage requirements</span>
                    </div>
                }
            </form>
        </div>
    )
};

export default AddJobPayAndBenefitsComponent;
