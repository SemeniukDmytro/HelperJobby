export function thousandsDisplayHelper(number : number): string{
    const numberAsString : string = number.toString();
    if (numberAsString.includes(",") || numberAsString.includes(".")){
        return numberAsString;
    }
    return number.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 3 });

}