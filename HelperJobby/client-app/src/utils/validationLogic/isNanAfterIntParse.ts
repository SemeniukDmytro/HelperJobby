export function isNanAfterIntParse(value: string) {
    return Number.isNaN(Number.parseInt(value));
}