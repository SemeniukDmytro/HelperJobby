import React, {ChangeEvent, Dispatch, FC, FormEvent, SetStateAction, useEffect, useRef, useState} from 'react';
import './AddJobPayAndBenefitsComponent.scss';
import PageTitleWithImage from "../../../../../EmployersSideComponents/PageTitleWithImage/PageTitleWithImage";
import Wages from "../../../../../Components/Icons/Wages";
import CustomSelectWindow from "../../../../../EmployersSideComponents/CustomSelectWindow/CustomSelectWindow";
import {salaryRatesMapData, showPayByOptionsMapData} from "../../../../../AppConstData/PayRelatedData";
import SalaryAmountInputField from "../../../../../Components/SalaryAmountInputField/SalaryAmountInputField";
import {countriesWithCurrencies} from "../../../../../AppConstData/CountriesWithCurrencies";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faChevronDown,
    faChevronUp,
    faCircleExclamation,
    faTriangleExclamation
} from "@fortawesome/free-solid-svg-icons";
import {benefitsStringValues} from "../../../../../AppConstData/JobEnumsToStringsArrays";
import JobFeature from "../../../../../EmployersSideComponents/JobFeature/JobFeature";
import {
    benefitStringToEnumMap,
    salaryRatesEnumToStringMap
} from "../../../../../utils/convertLogic/enumToStringConverter";

import JobCreateNavigationButtons
    from "../../../SharedComponents/JobCreateNavigationButtons/JobCreateNavigationButtons";
import {useNavigate, useParams} from "react-router-dom";
import EmployerPagesPaths from "../../../../../AppRoutes/Paths/EmployerPagesPaths";
import EmployeeBenefits from "../../../../../enums/modelDataEnums/EmployeeBenefits";
import {ShowPayByOptions} from "../../../../../enums/modelDataEnums/ShowPayByOptions";
import useJobCreation from "../../../../../hooks/useJobCreation";
import {
    useJobLoaderForSettingCurrentIncompleteJob
} from "../../../../../hooks/useJobLoaderForSettingCurrentIncompleteJob";
import {IncompleteJobService} from "../../../../../services/incompleteJobService";
import {minimalSalaryIsTooLowError, useSalaryValidation} from "../../../../../hooks/useSalaryValidation";
import {logErrorInfo} from "../../../../../utils/logErrorInfo";
import {UpdatedIncompleteJobDTO} from "../../../../../DTOs/jobRelatetedDTOs/UpdatedIncompleteJobDTO";
import {getValidFloatNumberFromString} from "../../../../../utils/validationLogic/numbersValidators";
import LoadingPage from "../../../../../Components/LoadingPage/LoadingPage";
import {checkMinimalSalary} from "../../../../../utils/validationLogic/checkMinimalSalary";

interface AddJobPayAndBenefitsComponentProps {
}

const AddJobPayAndBenefitsComponent: FC<AddJobPayAndBenefitsComponentProps> = () => {
    const [showPayBy, setShowPayBy] = useState("Range");
    const [salaryRate, setSalaryRate] = useState("per hour");
    const [rangeMinSalaryAmount, setRangeMinSalaryAmount] = useState("");
    const [rangeMaxSalaryAmount, setRangeMaxSalaryAmount] = useState("");
    const [exactSalaryAmount, setExactSalaryAmount] = useState("");
    const [startingSalaryAmount, setStartingSalaryAmount] = useState("");
    const [maximumSalaryAmount, setMaximumSalaryAmount] = useState("");
    const [isInvalidMinSalary, setIsInvalidMinSalary] = useState(false);
    const [isInvalidMaxSalary, setIsInvalidMaxSalary] = useState(false);
    const [currency, setCurrency] = useState(getCurrency());
    const [minSalaryInputError, setMinSalaryInputError] = useState("");
    const [maxSalaryInputError, setMaxSalaryInputError] = useState("");
    const [minSalaryMeetsRequirement, setMinSalaryMeetsRequirement] = useState(false);
    const [showMissingSalaryWarning, setShowMissingSalaryWarning] = useState(false);
    const [selectedBenefits, setSelectedBenefits] = useState<EmployeeBenefits[]>([]);
    const [benefitsBoxHeight, setBenefitsBoxHeight] = useState("78px");
    const benefitsListRef = useRef<HTMLUListElement>(null);
    const [showFullBenefitsList, setShowFullBenefitsList] = useState(false);

    const {incompleteJob, setIncompleteJob} = useJobCreation();
    const {jobId} = useParams<{jobId : string}>();
    const {fetchJobAndSetJobCreation} =  useJobLoaderForSettingCurrentIncompleteJob(jobId ? parseInt(jobId) : 0, incompleteJob, setIncompleteJob);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [requestInProgress, setRequestInProgress] = useState(false);
    const incompleteJobService = new IncompleteJobService();
    
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

    useEffect(() => {
        fetchInitialPageData()
    }, []);

    useEffect(() => {
        if (incompleteJob){
            if (incompleteJob.salary){
                const incompleteJobShowPayOption = showPayByOptionsMapData.find(spo => spo.enumValue == incompleteJob.salary?.showPayByOption)?.stringValue || "Range";
                setShowPayBy(incompleteJobShowPayOption);
                setSalaryRate(salaryRatesEnumToStringMap(incompleteJob.salary.salaryRate));
                getSalaryInputProp(incompleteJobShowPayOption).setSalaryInput(incompleteJob.salary.minimalAmount.toString());
                if (incompleteJob.salary.showPayByOption == ShowPayByOptions.Range){
                    setRangeMaxSalaryAmount(incompleteJob.salary.maximalAmount?.toString() || "")
                }
                if (incompleteJob.salary.meetsMinSalaryRequirement && !checkMinimalSalary(incompleteJob.salary.minimalAmount,
                    salaryRatesEnumToStringMap(incompleteJob.salary.salaryRate)))
                {
                    setMinSalaryMeetsRequirement(true);
                    setMinSalaryInputError(minimalSalaryIsTooLowError);
                }
            }
            
            setSelectedBenefits(incompleteJob.benefits || []);
            setCurrency(countriesWithCurrencies.find(c => c.country === incompleteJob.locationCountry)?.currency || "")
            setLoading(false);
        }
    }, [incompleteJob]);

    async function fetchInitialPageData(){
        await fetchJobAndSetJobCreation();
    }
    
    useEffect(() => {
        const currentSalaryValue = getSalaryInputProp(showPayBy).salaryInput;
        if (currentSalaryValue){
            setShowMissingSalaryWarning(false);
            isValidSalaryValueProvided(currentSalaryValue);
            if (showPayBy == "Range" && rangeMaxSalaryAmount){
                validateMaxSalaryInput(rangeMinSalaryAmount, rangeMaxSalaryAmount)
            }
        }
        else {
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
    

    function getCurrency() {
        const currency = countriesWithCurrencies.find(c => c.country === "Canada")?.currency;
        return currency || "";
    }

    function removeInvalidMinimalSalaryError() {
        setMinSalaryMeetsRequirement(!minSalaryMeetsRequirement);
        if (!minSalaryMeetsRequirement){
            setIsInvalidMinSalary(false);   
        }
        else {
            setIsInvalidMinSalary(true);
        }
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
        navigate(`${EmployerPagesPaths.JOB_DETAILS}/${jobId}`)
    }

   async function handlePayAndBenefitSubmit(e : FormEvent) {
        e.preventDefault();
        const currentSalaryValue = getSalaryInputProp(showPayBy).salaryInput;
        if (currentSalaryValue){
            isValidSalaryValueProvided(currentSalaryValue);
            if (showPayBy == "Range"){
                validateMaxSalaryInput(currentSalaryValue, rangeMaxSalaryAmount);
            }
            if (isInvalidMaxSalary || isInvalidMinSalary){
                return;
            }
        }
        try {
            setRequestInProgress(true);
            const updatedIncompleteJob : UpdatedIncompleteJobDTO = {
                benefits : selectedBenefits
            }
            if (currentSalaryValue){
                updatedIncompleteJob.salary = {
                    minimalAmount: getValidFloatNumberFromString(currentSalaryValue),
                    maximalAmount: showPayBy == "Range" ? getValidFloatNumberFromString(rangeMaxSalaryAmount) : undefined,
                    salaryRate: salaryRatesMapData.find(sr => sr.stringValue == salaryRate)!.enumValue,
                    showPayByOption: showPayByOptionsMapData.find(spo => spo.stringValue == showPayBy)!.enumValue,
                    meetsMinSalaryRequirement : minSalaryMeetsRequirement
                }
            }
            const retrievedIncompleteJob = await incompleteJobService.updateJobCreation(parseInt(jobId!), updatedIncompleteJob);
            setIncompleteJob(retrievedIncompleteJob);
            navigate(`${EmployerPagesPaths.DESCRIPTION_AND_APPLICATION_DETAILS}/${jobId}`)
        }
        catch (err){
            logErrorInfo(err)
        }
        finally {
            setRequestInProgress(false)
        }
    }
    
    function getSalaryInputProp(showPayByOption : string) : {salaryInput : string, setSalaryInput : Dispatch<SetStateAction<string>>} {
        const showPayEnumValue : ShowPayByOptions = showPayByOptionsMapData.find(spo => spo.stringValue == showPayByOption)!.enumValue;
        switch (showPayEnumValue){
            case ShowPayByOptions.Range:
                return {salaryInput : rangeMinSalaryAmount, setSalaryInput : setRangeMinSalaryAmount};
            case ShowPayByOptions.StartingAmount:
                return {salaryInput : startingSalaryAmount, setSalaryInput : setStartingSalaryAmount};
            case ShowPayByOptions.MaximumAmount:
                return {salaryInput : maximumSalaryAmount, setSalaryInput : setMaximumSalaryAmount};
            case ShowPayByOptions.ExactAmount:
                return {salaryInput : exactSalaryAmount, setSalaryInput : setExactSalaryAmount};
                
        }
        
    }
    
    return (
        loading ? <LoadingPage/> : 
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
                            optionsArr={showPayByOptionsMapData.map(spo => spo.stringValue)}
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
                            <input className={"checkbox"} onChange={removeInvalidMinimalSalaryError} checked={minSalaryMeetsRequirement} type={"checkbox"}/>
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
                        requestInProgress={requestInProgress}
                        backButtonOnClick={goToPreviousPage}
                        nextPageButtonClick={handlePayAndBenefitSubmit}
                    />
                </form>
            </div>
        </div>
    )
};

export default AddJobPayAndBenefitsComponent;
