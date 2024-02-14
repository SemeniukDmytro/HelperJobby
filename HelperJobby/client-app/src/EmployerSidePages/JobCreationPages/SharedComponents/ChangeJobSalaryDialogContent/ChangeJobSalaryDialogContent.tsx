import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import './ChangeJobSalaryDialogContent.scss';
import useJobCreation from "../../../../hooks/useJobCreation";
import {IncompleteJobService} from "../../../../services/incompleteJobService";
import {useSalaryValidation} from "../../../../hooks/useSalaryValidation";
import {useShowPayByOption} from "../../../../hooks/comnonentsSharedHooks/useShowPayByOption";
import {
    salaryRatesEnumToStringMap,
    showPayByOptionsEnumToStringMap
} from "../../../../utils/convertLogic/enumToStringConverter";
import {CreateUpdateSalaryDTO} from "../../../../DTOs/jobRelatetedDTOs/CreateUpdateSalaryDTO";
import {getValidFloatNumberFromString} from "../../../../utils/validationLogic/numbersValidators";
import {salaryRatesMapData, showPayByOptionsMapData} from "../../../../AppConstData/PayRelatedData";
import {logErrorInfo} from "../../../../utils/logErrorInfo";
import JobSalaryBlock from "../JobSalaryBlock/JobSalaryBlock";

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
    const {incompleteJob, setIncompleteJob} = useJobCreation();
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
        if (incompleteJob?.salary){
            setSalaryRate(salaryRatesEnumToStringMap(incompleteJob.salary.salaryRate));
            setShowPayBy(showPayByOptionsEnumToStringMap(incompleteJob.salary.showPayByOption));
            setRangeMaxSalaryAmount(incompleteJob.salary.maximalAmount?.toString() || "");
            getSalaryInputProp(showPayByOptionsEnumToStringMap(incompleteJob.salary.showPayByOption)).setSalaryInput(incompleteJob.salary.minimalAmount.toString());
            setMinSalaryMeetsRequirement(incompleteJob.salary.meetsMinSalaryRequirement);
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
            const retrievedIncompleteJob = await incompleteJobService.updateIncompleteJobSalary(incompleteJob!.id, updatedSalary);
            setIncompleteJob(retrievedIncompleteJob);
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
                        setCurrency={setCurrency}
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
