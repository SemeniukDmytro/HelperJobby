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
import {IncompleteJobService} from "../../../../../services/incompleteJobService";
import {logErrorInfo} from "../../../../../utils/logErrorInfo";
import {UpdatedIncompleteJobDTO} from "../../../../../DTOs/jobRelatetedDTOs/UpdatedIncompleteJobDTO";
import {getValidFloatNumberFromString} from "../../../../../utils/validationLogic/numbersValidators";
import LoadingPage from "../../../../../Components/LoadingPage/LoadingPage";
import {checkMinimalSalary} from "../../../../../utils/validationLogic/checkMinimalSalary";
import JobSalaryBlock from "../../../SharedComponents/JobSalaryBlock/JobSalaryBlock";
import {handleJobFeaturesListAppearance} from "../../../../../utils/handleJobFeaturesListHeight";
import {addBenefit} from "../../../../../utils/manageJobFeatureSelect";
import {JobCreationStates} from "../../../../../enums/utilityEnums/JobCreationStates";
import useCurrentEmployerJob from "../../../../../hooks/contextHooks/useCurrentEmployerJob";
import {useJobLoaderToSetCurrentJob} from "../../../../../hooks/comnonentSharedHooks/useJobLoaderToSetCurrentJob";
import {
    minimalSalaryIsTooLowError,
    useSalaryValidation
} from "../../../../../hooks/comnonentSharedHooks/useSalaryValidation";
import {useShowPayByOption} from "../../../../../hooks/comnonentSharedHooks/useShowPayByOption";

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

    const {currentJob, setCurrentJob} = useCurrentEmployerJob();
    const {jobId} = useParams<{jobId : string}>();
    const [loading, setLoading] = useState(false);
    const {fetchJobAndSetJobCreation} = useJobLoaderToSetCurrentJob(jobId ? parseInt(jobId) : 0, currentJob, setCurrentJob, JobCreationStates.incompleteJob);
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
        if (currentJob){
            if (currentJob.salary){
                const incompleteJobShowPayOption = showPayByOptionsMapData.find(spo => spo.enumValue == currentJob.salary?.showPayByOption)?.stringValue || "Range";
                setShowPayBy(incompleteJobShowPayOption);
                setSalaryRate(salaryRatesEnumToStringMap(currentJob.salary.salaryRate));
                getSalaryInputProp(incompleteJobShowPayOption).setSalaryInput(currentJob.salary.minimalAmount.toString());
                if (currentJob.salary.showPayByOption == ShowPayByOptions.Range){
                    setRangeMaxSalaryAmount(currentJob.salary.maximalAmount?.toString() || "")
                }
                if (currentJob.salary.meetsMinSalaryRequirement && !checkMinimalSalary(currentJob.salary.minimalAmount,
                    salaryRatesEnumToStringMap(currentJob.salary.salaryRate)))
                {
                    setMinSalaryMeetsRequirement(true);
                    setMinSalaryInputError(minimalSalaryIsTooLowError);
                }
            }
            
            setSelectedBenefits(currentJob.benefits || []);
            setCurrency(countriesWithCurrencies.find(c => c.country === currentJob.locationCountry)?.currency || "");
            setLoading(false);
        }
    }, [currentJob]);

    async function fetchInitialPageData(){
        await fetchJobAndSetJobCreation();
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
            setCurrentJob(retrievedIncompleteJob);
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
                                    onClick={() => addBenefit(benefits, selectedBenefits, setSelectedBenefits)}
                                />
                            ))}
                        </ul>
                    </div>
                    <div className={"mt05rem"}>
                   <span className={"bold-navigation-link"} onClick={() => handleJobFeaturesListAppearance(showFullBenefitsList,
                       setShowFullBenefitsList, setBenefitsBoxHeight, benefitsListRef)}>
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
