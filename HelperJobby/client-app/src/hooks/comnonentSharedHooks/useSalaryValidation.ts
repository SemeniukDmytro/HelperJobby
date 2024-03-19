import {Dispatch, SetStateAction} from "react";
import {getValidFloatNumberFromString, isValidNumber} from "../../utils/validationLogic/numbersValidators";
import {checkMinimalSalary} from "../../utils/validationLogic/checkMinimalSalary";

export const invalidNumberError: string = "This number doesn't look right. Use a valid format (e.g. 50,000.00).";
export const minimalSalaryIsTooLowError: string = "This wage appears to be below the minimum wage for this location. Update the minimum pay or check the box to confirm that your job is exempt from local minimum wage requirements.";
export const maximumSalaryIsLowerThanMinimumError: string = "Use a range (low to high), or make another selection for pay.";

export function useSalaryValidation(
    setIsInvalidMinSalary: Dispatch<SetStateAction<boolean>>,
    setIsInvalidMaxSalary: Dispatch<SetStateAction<boolean>>,
    setShowMissingSalaryWarning: Dispatch<SetStateAction<boolean>>,
    setMaxSalaryInputError: Dispatch<SetStateAction<string>>,
    setMinSalaryInputError: Dispatch<SetStateAction<string>>,
    minSalaryMeetsLaw: boolean,
    salaryRate: string,
    showPayOption: string
) {
    function validateMinSalaryInput(minSalaryAmountString: string, maxSalaryAmountString: string) {

        if (!minSalaryAmountString && !maxSalaryAmountString) {
            setMinSalaryInputError("");
            setIsInvalidMinSalary(false);
            setMaxSalaryInputError("");
            setIsInvalidMaxSalary(false);
            setShowMissingSalaryWarning(true);
            return;
        } else {
            setShowMissingSalaryWarning(false);
        }

        isValidSalaryValueProvided(minSalaryAmountString);
        if (showPayOption == "Range") {
            isValidSalaryRangeProvided(minSalaryAmountString, maxSalaryAmountString)
        }
    }

    function validateMaxSalaryInput(minSalaryAmountValue: string, maxSalaryAmountValue: string) {
        if (!minSalaryAmountValue && !maxSalaryAmountValue) {
            setMinSalaryInputError("");
            setIsInvalidMinSalary(false);
            setMaxSalaryInputError("");
            setIsInvalidMaxSalary(false);
            setShowMissingSalaryWarning(true);
            return;
        } else {
            setShowMissingSalaryWarning(false);
        }

        if (!isValidNumber(maxSalaryAmountValue)) {
            setIsInvalidMaxSalary(true);
            setMaxSalaryInputError(invalidNumberError);
            return;
        }
        isValidSalaryRangeProvided(minSalaryAmountValue, maxSalaryAmountValue)
    }

    function isValidSalaryRangeProvided(minSalaryAmount: string, maxSalaryAmount: string) {
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

    function isValidSalaryValueProvided(salaryInput: string) {
        if (!isValidNumber(salaryInput)) {
            setIsInvalidMinSalary(true);
            setMinSalaryInputError(invalidNumberError)
            return;
        }

        const minSalaryAmountNumber = getValidFloatNumberFromString(salaryInput);

        if (!checkMinimalSalary(minSalaryAmountNumber, salaryRate)) {
            setMinSalaryInputError(minimalSalaryIsTooLowError)
            if (minSalaryMeetsLaw) {
                setIsInvalidMinSalary(false);
            } else {
                setIsInvalidMinSalary(true);
            }
        } else {
            setMinSalaryInputError("");
            setIsInvalidMinSalary(false);
        }
    }

    return {validateMinSalaryInput, validateMaxSalaryInput, isValidSalaryValueProvided}
}