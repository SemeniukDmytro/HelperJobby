import React, {FC, FormEvent, useEffect, useRef, useState} from 'react';
import './AddJobPayAndBenefitsComponent.scss';
import PageTitleWithImage from "../../../../../EmployersSideComponents/PageTitleWithImage/PageTitleWithImage";
import Wages from "../../../../../Components/Icons/Wages";
import {salaryRatesMapData, showPayByOptionsMapData} from "../../../../../AppConstData/PayRelatedData";
import {countriesWithCurrencies} from "../../../../../AppConstData/CountriesWithCurrencies";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faChevronDown,
    faChevronUp,
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
import JobSalaryBlock from "../../../SharedComponents/JobSalaryBlock/JobSalaryBlock";
import {useShowPayByOption} from "../../../../../hooks/comnonentsSharedHooks/useShowPayByOption";

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
    const [currency, setCurrency] = useState("CAD");
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
    
    const {isValidSalaryValueProvided, validateMaxSalaryInput} = 
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
    
    
    return (
        loading ? <LoadingPage/> : 
        <div className={"employers-centralized-page-layout"}>
            <PageTitleWithImage imageElement={<Wages/>} title={"Add job pay and benefits"}/>
            <div className={"emp-form-fb"}>
                <form className={"emp-form"}>
                    <span className={"small-title"}>Pay</span>
                    <JobSalaryBlock showPayBy={showPayBy}
                                    setShowPayBy={setShowPayBy}
                                    salaryRate={salaryRate}
                                    setSalaryRate={setSalaryRate}
                                    rangeMinSalaryAmount={rangeMinSalaryAmount}
                                    setRangeMinSalaryAmount={setRangeMinSalaryAmount}
                                    rangeMaxSalaryAmount={rangeMaxSalaryAmount}
                                    setRangeMaxSalaryAmount={setRangeMaxSalaryAmount}
                                    exactSalaryAmount={exactSalaryAmount}
                                    setExactSalaryAmount={setExactSalaryAmount}
                                    startingSalaryAmount={startingSalaryAmount}
                                    setStartingSalaryAmount={setStartingSalaryAmount}
                                    maximumSalaryAmount={maximumSalaryAmount}
                                    setMaximumSalaryAmount={setMaximumSalaryAmount}
                                    isInvalidMinSalary={isInvalidMinSalary}
                                    setIsInvalidMinSalary={setIsInvalidMinSalary}
                                    isInvalidMaxSalary={isInvalidMaxSalary}
                                    setIsInvalidMaxSalary={setIsInvalidMaxSalary}
                                    currency={currency}
                                    setCurrency={setCurrency}
                                    minSalaryInputError={minSalaryInputError}
                                    setMinSalaryInputError={setMinSalaryInputError}
                                    maxSalaryInputError={maxSalaryInputError}
                                    setMaxSalaryInputError={setMaxSalaryInputError}
                                    minSalaryMeetsRequirement={minSalaryMeetsRequirement}
                                    setMinSalaryMeetsRequirement={setMinSalaryMeetsRequirement}
                                    showMissingSalaryWarning={showMissingSalaryWarning}
                                    setShowMissingSalaryWarning={setShowMissingSalaryWarning}
                                    includeWindowScroll={true}
                    />
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
