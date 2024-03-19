export function isNanAfterIntParse(value: string) {
    if (!isValidNumber(value)) {
        return;
    }
    return Number.isNaN(Number.parseInt(value));
}

export function isValidNumber(value: string) {
    const validationRegex = /^\d{1,3}(,?\d{3})*(\.\d+)?$/;
    return validationRegex.test(value);
}

export function getValidFloatNumberFromString(value: string) {
    const numericString = value.replace(/,/g, '');
    return parseFloat(numericString);
}