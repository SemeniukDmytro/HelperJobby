import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import './ChangeJobSalaryDialogContent.scss';
import {
    salaryRatesEnumToStringMap,
    showPayByOptionsEnumToStringMap
} from "../../../../utils/convertLogic/enumToStringConverter";
import {logErrorInfo} from "../../../../utils/logErrorInfo";
import JobSalaryBlock from "../JobSalaryBlock/JobSalaryBlock";
import {JobService} from "../../../../services/jobService";
import {JobCreationStates} from "../../../../enums/utilityEnums/JobCreationStates";
import {CreateUpdateSalaryDTO} from "../../../../DTOs/jobRelatetedDTOs/CreateUpdateSalaryDTO";
import {getValidFloatNumberFromString} from "../../../../utils/validationLogic/numbersValidators";
import {salaryRatesMapData, showPayByOptionsMapData} from "../../../../AppConstData/PayRelatedData";
import {countriesWithCurrencies} from "../../../../AppConstData/CountriesWithCurrencies";
import useCurrentEmployerJob from "../../../../hooks/contextHooks/useCurrentEmployerJob";
import {IncompleteJobService} from "../../../../services/incompleteJobService";
import {useSalaryValidation} from "../../../../hooks/comnonentSharedHooks/useSalaryValidation";
import {useShowPayByOption} from "../../../../hooks/comnonentSharedHooks/useShowPayByOption";

interface ChangeJobSalaryDialogContentProps {
    showDialog : boolean;
    setShowDialog? : Dispatch<SetStateAction<boolean>>;
    setRequestInProgress : Dispatch<SetStateAction<boolean>>;
    setEditFunction : Dispatch<SetStateAction<() => void>>;
}

const ChangeJobSalaryDialogContent: FC<ChangeJobSalaryDialogContentProps> = ({
                                                                                 showDialog,
                                                                                 setRequestInProgress,
                                                                                 setEditFunction,
                                                                                 setShowDialog
                                                                             }) => {
    const {currentJob, setCurrentJob, jobCreationState} = useCurrentEmployerJob();
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
    const incompleteJobService = new IncompleteJobService();
    const jobService = new JobService();
    
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
        if (showDialog){
            setExistingSalaryValues();
        }
    }, [showDialog]);

    useEffect(() => {
        setEditFunction(() => editJobSalary)
    }, [salaryRate, showPayBy, rangeMinSalaryAmount, rangeMaxSalaryAmount, maximumSalaryAmount, startingSalaryAmount, exactSalaryAmount]);


    function setExistingSalaryValues(){
        if (currentJob?.salary){
            setSalaryRate(salaryRatesEnumToStringMap(currentJob.salary.salaryRate));
            setShowPayBy(showPayByOptionsEnumToStringMap(currentJob.salary.showPayByOption));
            setRangeMaxSalaryAmount(currentJob.salary.maximalAmount?.toString() || "");
            getSalaryInputProp(showPayByOptionsEnumToStringMap(currentJob.salary.showPayByOption)).setSalaryInput(currentJob.salary.minimalAmount.toString());
            setMinSalaryMeetsRequirement(currentJob.salary.meetsMinSalaryRequirement);
            setCurrency(countriesWithCurrencies.find(c => c.country === currentJob.locationCountry)?.currency || "");
        }
    }

    async function editJobSalary(){
        const currentSalaryValue = getSalaryInputProp(showPayBy).salaryInput;
        if (currentSalaryValue){
            isValidSalaryValueProvided(currentSalaryValue);
            if (showPayBy == "Range"){
                validateMaxSalaryInput(currentSalaryValue, rangeMaxSalaryAmount);
                if (!rangeMaxSalaryAmount || !rangeMinSalaryAmount){
                    return;
                }
            }
            if (isInvalidMaxSalary || isInvalidMinSalary){
                return;
            }
        }
        try {
            setRequestInProgress(true);
            
            if (jobCreationState == JobCreationStates.incompleteJob){
                let updatedSalary : CreateUpdateSalaryDTO | null = null;
                if (currentSalaryValue){
                    updatedSalary = {
                        minimalAmount: getValidFloatNumberFromString(currentSalaryValue),
                        maximalAmount: showPayBy == "Range" ? getValidFloatNumberFromString(rangeMaxSalaryAmount) : undefined,
                        salaryRate: salaryRatesMapData.find(sr => sr.stringValue == salaryRate)!.enumValue,
                        showPayByOption: showPayByOptionsMapData.find(spo => spo.stringValue == showPayBy)!.enumValue,
                        meetsMinSalaryRequirement : minSalaryMeetsRequirement
                    }
                }
                const retrievedIncompleteJob = await incompleteJobService.updateIncompleteJobSalary(currentJob!.id, updatedSalary);
                setCurrentJob(retrievedIncompleteJob);
            }
            else {
                let updatedSalary : CreateUpdateSalaryDTO | null = null;
                if (currentSalaryValue){
                    updatedSalary = {
                        minimalAmount: getValidFloatNumberFromString(currentSalaryValue),
                        maximalAmount: showPayBy == "Range" ? getValidFloatNumberFromString(rangeMaxSalaryAmount) : undefined,
                        salaryRate: salaryRatesMapData.find(sr => sr.stringValue == salaryRate)!.enumValue,
                        showPayByOption: showPayByOptionsMapData.find(spo => spo.stringValue == showPayBy)!.enumValue,
                        meetsMinSalaryRequirement : minSalaryMeetsRequirement
                    }
                }
                const retrievedIncompleteJob = await jobService.putJobSalary(currentJob!.id, updatedSalary);
                setCurrentJob(retrievedIncompleteJob);
            }
            
            
            setShowDialog && setShowDialog(false);
        }
        catch (err)
        {
            logErrorInfo(err);
        }
        finally {
            setRequestInProgress(false);
        }
    }
    
    return (
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
                        includeWindowScroll={false}
                        selectWindowsZIndex={10100}
        />
    )
}

export default ChangeJobSalaryDialogContent;
