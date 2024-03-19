import {Dispatch, SetStateAction, useCallback} from "react";
import {ShowPayByOptions} from "../../enums/modelDataEnums/ShowPayByOptions";
import {showPayByOptionsMapData} from "../../AppConstData/PayRelatedData";

export function useShowPayByOption(rangeMinSalaryAmount: string,
                                   setRangeMinSalaryAmount: Dispatch<SetStateAction<string>>,
                                   exactSalaryAmount: string,
                                   setExactSalaryAmount: Dispatch<SetStateAction<string>>,
                                   startingSalaryAmount: string,
                                   setStartingSalaryAmount: Dispatch<SetStateAction<string>>,
                                   maximumSalaryAmount: string,
                                   setMaximumSalaryAmount: Dispatch<SetStateAction<string>>
) {
    const getSalaryInputProp = useCallback((showPayByOption: string) => {
        const showPayEnumValue: ShowPayByOptions = showPayByOptionsMapData
            .find(spo => spo.stringValue == showPayByOption)!.enumValue;
        switch (showPayEnumValue) {
            case ShowPayByOptions.Range:
                return {salaryInput: rangeMinSalaryAmount, setSalaryInput: setRangeMinSalaryAmount};
            case ShowPayByOptions.StartingAmount:
                return {salaryInput: startingSalaryAmount, setSalaryInput: setStartingSalaryAmount};
            case ShowPayByOptions.MaximumAmount:
                return {salaryInput: maximumSalaryAmount, setSalaryInput: setMaximumSalaryAmount};
            case ShowPayByOptions.ExactAmount:
                return {salaryInput: exactSalaryAmount, setSalaryInput: setExactSalaryAmount};

        }
    }, [rangeMinSalaryAmount, exactSalaryAmount, maximumSalaryAmount, startingSalaryAmount]);

    return {getSalaryInputProp};

}